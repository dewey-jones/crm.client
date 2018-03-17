import { Injectable } from "@angular/core";
import { appSettings } from "../app-settings";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { IContact } from "./contact";

@Injectable()
export class ContactService {
    private _contactUrl = appSettings.serverPath + '/api/contact';
    
    constructor(private _http: HttpClient) {}

    getContacts(companyId: number): Observable<IContact[]> {
        return this._http.get<IContact[]>(this._contactUrl + "/getByCompany?companyId=" + companyId)
        .do(data => console.log('All: ' + JSON.stringify(data)))
        .catch(this.handleError);
}

    getContact(id: number): Observable<IContact> {
        return this._http.get<IContact>(this._contactUrl + "/" + id)
            .do(data => console.log('Contact: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    createContact(contact: IContact): any {
        const id = contact.id;
        console.log("URL", this._contactUrl);
        return this._http.post(this._contactUrl, contact)
            .do(data => console.log('Contact: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    updateContact(contact: IContact): any {
        const id = contact.id;
        console.log("in service", contact);
        console.log("URL", this._contactUrl + "/" + id);
        return this._http.put(this._contactUrl + "/" + id, contact)
            .do(data => console.log('Contact: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    deleteContact(id: number): any {
        return this._http.delete(this._contactUrl + "/" + id)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(err: HttpErrorResponse) {
        console.log(err.message);
        return Observable.throw(err.message);
    }
}