import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { appSettings } from "../app-settings";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IContact } from "./contact";

@Injectable()
export class ContactService {
  private _contactUrl = appSettings.serverPath + '/api/contact';

  constructor(private _http: HttpClient) { }

  getAllContacts(): Observable<IContact[]> {
    return this._http.get<IContact[]>(this._contactUrl + "/getAll").pipe(
      catchError(this.handleError));
  }

  getContacts(companyId: number): Observable<IContact[]> {
    return this._http.get<IContact[]>(this._contactUrl + "/getByCompany?companyId=" + companyId).pipe(
      catchError(this.handleError));
  }

  getContact(id: number): Observable<IContact> {
    return this._http.get<IContact>(this._contactUrl + "/" + id).pipe(
      // .do(data => console.log('Contact: ' + JSON.stringify(data)))
      catchError(this.handleError));
  }

  createContact(contact: IContact): any {
    const id = contact.id;
    console.log("URL", this._contactUrl);
    return this._http.post(this._contactUrl, contact).pipe(
      tap(data => console.log('Contact: ' + JSON.stringify(data))),
      catchError(this.handleError));
  }

  updateContact(contact: IContact): any {
    const id = contact.id;
    console.log("in service", contact);
    console.log("URL", this._contactUrl + "/" + id);
    return this._http.put(this._contactUrl + "/" + id, contact).pipe(
      tap(data => console.log('Contact: ' + JSON.stringify(data))),
      catchError(this.handleError));
  }

  deleteContact(id: number): any {
    return this._http.delete(this._contactUrl + "/" + id).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return observableThrowError(err.message);
  }
}