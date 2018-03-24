import { Component, OnInit } from '@angular/core';
import { NoteService } from '../note.service';
import { ActivatedRoute, Router } from '@angular/router';

import { INote, Note } from '../note';


@Component({
  selector: 'pm-note',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})
export class NoteDetailComponent implements OnInit {
  pageTitle: string = 'Note Detail';
  errorMessage: string;
  contactId: number;
  sub: any;  // subscription

  note: INote;

  constructor(private _noteService: NoteService, 
    private _route: ActivatedRoute, 
    private _router: Router) {
   }

   ngOnInit(): void {
    this.sub = this._route
      .queryParams
      .subscribe(params => {
        // Defaults companyId to 0 if no query param provided (new contact).
        this.contactId = +params['contactId'] || 0;
      });

    console.log(this._route.snapshot.paramMap.get('id'));
    let id = +this._route.snapshot.paramMap.get('id');
    this.pageTitle += `: ${id}`;
    if(id != 0) {
      this._noteService.getNote(id)
      .subscribe(note => {
          this.note = note;
      },
      error => this.errorMessage = <any>error);
    } else {
      this.note = new Note();
    }
  }
  save(): void {
    console.log(this.note);
    console.log(this._route.snapshot.paramMap.get('id'));
    let id = +this._route.snapshot.paramMap.get('id');
    // if new note...
    if(id === 0) {
      this.note.contactId = this.contactId;
      this._noteService.createNote(this.note)
        .subscribe(note => {
            this.note = note;
        },
        error => this.errorMessage = <any>error);
    } else {
      this._noteService.updateNote(this.note)
        .subscribe(note => {
            this.note = note;
        },
        error => this.errorMessage = <any>error);
    }
  }

  delete(): void {
    console.log(this.note);
    this._noteService.deleteNote(this.note.id)
      .subscribe(note => {
          this.note = note;
      },
      error => this.errorMessage = <any>error);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
