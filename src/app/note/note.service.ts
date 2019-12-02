
import {throwError as observableThrowError,  Observable } from 'rxjs';

import {catchError, tap} from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { appSettings } from "../app-settings";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';




import { INote } from "./note";

@Injectable()
export class NoteService {
    private _noteUrl = appSettings.serverPath + '/api/note';
    
    constructor(private _http: HttpClient) {}

    getNotes(contactId: number): Observable<INote[]> {
        return this._http.get<INote[]>(this._noteUrl + "/getByContact?contactId=" + contactId).pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError),);
}

    getNote(id: number): Observable<INote> {
        return this._http.get<INote>(this._noteUrl + "/" + id).pipe(
            tap(data => console.log('Note: ' + JSON.stringify(data))),
            catchError(this.handleError),);
    }

    createNote(note: INote): any {
        const id = note.id;
        console.log("URL", this._noteUrl);
        return this._http.post(this._noteUrl, note).pipe(
            tap(data => console.log('Note: ' + JSON.stringify(data))),
            catchError(this.handleError),);
    }

    updateNote(note: INote): any {
        const id = note.id;
        console.log("in service", note);
        console.log("URL", this._noteUrl + "/" + id);
        return this._http.put(this._noteUrl + "/" + id, note).pipe(
            tap(data => console.log('Note: ' + JSON.stringify(data))),
            catchError(this.handleError),);
    }

    deleteNote(id: number): any {
        return this._http.delete(this._noteUrl + "/" + id).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError),);
    }

    private handleError(err: HttpErrorResponse) {
        console.log(err.message);
        return observableThrowError(err.message);
    }
}