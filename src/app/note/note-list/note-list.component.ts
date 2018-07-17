import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Router } from '@angular/router';
import { INote } from "../note";
import { NoteService } from '../note.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'crm-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit, OnChanges {
  @Input() contactId: number;
  displayedColumns = ['contactDate', 'noteText'];
  notes: INote[] = [];
  summarizedNotes: INote[] = [];
  errorMessage: string;

  constructor(private _noteService: NoteService,
    private _router: Router) { }

  ngOnInit(): void {
    console.log(this.contactId);
    this._noteService.getNotes(this.contactId)
        .subscribe(notes => {
          console.log("notes", notes);
          this.notes = notes;
          },
          error => this.errorMessage = <any>error);
        // this.summarizedNotes = [{
        //   id: 3,
        //   contactId: 4,
        //   contactDate: new Date(),
        //   noteText: 'asdf  laksjdfl asdlfkj  lsdf gdgdf  sdg dfsfds df gfd'.substring(0,9) + '...'
        // }];
  }

    // const a = this.notes.map(note => {
    //   return {
    //     id: note.id,
    //     contactId: note.contactId,
    //     contactDate: note.contactDate,
    //     startText: note.noteText.substring(0,9) + '...'
    //   }
    // });
    // console.log("a", a);
    // return a;
  // }

  addNote(): void {
    this._router.navigate(['/note', 0], { queryParams: { contactId: this.contactId } })
  }

  ngOnChanges() {

  }

}
