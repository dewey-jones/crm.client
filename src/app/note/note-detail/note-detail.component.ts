import { Component, OnInit } from '@angular/core';
import { NoteService } from '../note.service';
import { ContactService } from '../../contact/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { INote, Note } from '../note';
import { IContact } from '../../contact/contact';
import { AppService } from '../../app.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataUtilities } from '../../utilities';
import { MatDialog as M1, MatDialogRef as M2 } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'crm-note',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})
export class NoteDetailComponent implements OnInit {
  pageTitle: string = 'Note Detail';
  pageHeading: string = '';
  errorMessage: string;
  contactId: number;
  sub: any;  // subscription
  fullname: string;
  note: INote;
  contact: IContact;
  public noteForm: FormGroup;
  dialogRef: M2<ConfirmationDialogComponent>;

  constructor(private _noteService: NoteService,
    private _contactService: ContactService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _appService: AppService,
    public dialog: M1,
    private fb: FormBuilder,
    private dataUtilities: DataUtilities) {
    this.noteForm = this.fb.group({
      contactDate: [''],
      noteText: ['']
    });
  }

  ngOnInit(): void {
    this.sub = this._route
      .queryParams
      .subscribe(params => {
        // Defaults contactId to 0 if no query param provided (new contact).
        this.contactId = +params['contactId'] || 0;
      });

    let id = +this._route.snapshot.paramMap.get('id');

    this._contactService.getContact(this.contactId)
      .subscribe(contact => {
        this.contact = contact;
        var fullname = this.contact.fName + ' ' + this.contact.lName;
        this._appService.setTitle(fullname);
      });

    if (id != 0) {
      this._noteService.getNote(id)
        .subscribe(note => {
          this.note = note;
          var temp = this.dataUtilities.assignMatching(this.noteForm.value, this.note);
          this.noteForm.setValue(temp);
          //this.contactId = note.contactId;
        },
          error => this.errorMessage = <any>error,
        )
    } else {
      this.note = new Note();
      this.noteForm.controls.contactDate.setValue(new Date());
    }

    this._appService.setTitle(this.pageTitle);
  }

  save(): void {
    // console.log(this.contactId);
    // console.log(this._route.snapshot.paramMap.get('id'));
    let noteId = +this._route.snapshot.paramMap.get('id');
    var updatedNote = Object.assign(this.note, this.noteForm.value);
    // if new note...
    if (noteId === 0) {
      updatedNote.contactId = this.contactId;
      this._noteService.createNote(updatedNote)
        .subscribe(note => {
          this.note = note;
          this.backToList();
        },
          error => this.errorMessage = <any>error);
    } else {
      console.log("updating note", this.note);
      this._noteService.updateNote(updatedNote)
        .subscribe(note => {
          this.note = note;
          this.backToList();
        },
          error => this.errorMessage = <any>error);
    }
  }

  backToList(): void {
    this._router.navigate(['/contact/', this.contactId]);
  }

  delete(): void {
    this._noteService.deleteNote(this.note.id)
      .subscribe(note => {
        this.note = note;
        this.backToList();
      },
        error => this.errorMessage = <any>error);
  }

  openDeleteDialog() {
    this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete?"

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete();
      }
      this.dialogRef = null;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
