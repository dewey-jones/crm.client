import { Component, OnInit } from '@angular/core';
import { NoteService } from '../note.service';
import { ContactService } from '../../contact/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { INote, Note } from '../note';
import { IContact } from '../../contact/contact';
import {AppService} from '../../app.service';

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

  constructor(private _noteService: NoteService, 
    private _contactService: ContactService,
    private _route: ActivatedRoute, 
    private _router: Router,
    private _appService: AppService) {
   }

  ngOnInit(): void {
    this.sub = this._route
      .queryParams
      .subscribe(params => {
        // Defaults contactId to 0 if no query param provided (new contact).
        this.contactId = +params['contactId'] || 0;
        console.log("this.contactId is", this.contactId);
      });

    let id = +this._route.snapshot.paramMap.get('id');
    // this.pageTitle += `: ${id}`;
    if(id != 0) {
      this._noteService.getNote(id)
      .subscribe(note => {
          this.note = note;
        },
      error => this.errorMessage = <any>error,
      () => this._contactService.getContact(this.contactId)
      .subscribe(contact => {
        this.contact = contact;
        this.fullname = this.contact.fName + ' ' + this.contact.lName;
        console.log("fullname is", this.fullname);
        this.pageHeading = this.fullname;
      })
      )
   } else {
      this.note = new Note();
      this.note.contactDate = new Date();
    }

    this._appService.setTitle(this.pageTitle);
  }

  save(): void {
    console.log(this.contactId);
    console.log(this._route.snapshot.paramMap.get('id'));
    let noteId = +this._route.snapshot.paramMap.get('id');
    // if new note...
    if(noteId === 0) {
      this.note.contactId = this.contactId;
      this._noteService.createNote(this.note)
        .subscribe(note => {
            this.note = note;
            console.log("route", '/contact/' + this.contactId);
            this._router.navigate(['/contact/', this.contactId]);
               },
        error => this.errorMessage = <any>error);
    } else {
      console.log("updating note", this.note);
      this._noteService.updateNote(this.note)
        .subscribe(note => {
            this.note = note;
            console.log("route", '/contact/' + this.contactId);
            this._router.navigate(['/contact/', this.contactId]);
            },
        error => this.errorMessage = <any>error);
    }
  }

  back(): void {
    this._router.navigate(['/contact/', this.contactId]);
  }

  delete(): void {
    console.log(this.note);
    this._noteService.deleteNote(this.note.id)
      .subscribe(note => {
          this.note = note;
          console.log("route", '/contact/' + this.contactId);
          this._router.navigate(['/contact/', this.contactId]);
    },
      error => this.errorMessage = <any>error);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
