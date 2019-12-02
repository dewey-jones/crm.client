
import {throwError as observableThrowError,  Observable } from 'rxjs';

import {catchError, tap} from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { appSettings } from "../app-settings";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';




import { IRegistration } from "./registration";

@Injectable()
export class AccountService {
    private _accountUrl = appSettings.serverPath + '/api/account';
    
    constructor(private _http: HttpClient) {}

    register(registration: IRegistration): any {
      console.log("registration", registration);
      return this._http.post<IRegistration>(this._accountUrl, registration).pipe(
          tap(data => console.log('All: ' + JSON.stringify(data))),
          catchError(this.handleError),);
    }

    // getCompany(id: number): Observable<ICompany> {
    //     return this._http.get<ICompany>(this._companyUrl + "/" + id)
    //         .do(data => console.log('All: ' + JSON.stringify(data)))
    //         .catch(this.handleError);
    // }

    // saveCompany(company: ICompany): any {
    //     const id = company.id;
    //     console.log("in service", company);
    //     console.log("URL", this._companyUrl + "/" + id);
    //     return this._http.put(this._companyUrl + "/" + id, company)
    //         .do(data => console.log('All: ' + JSON.stringify(data)))
    //         .catch(this.handleError);
    // }

    // deleteCompany(id: number): any {
    //     return this._http.delete(this._companyUrl + "/" + id)
    //         .do(data => console.log('All: ' + JSON.stringify(data)))
    //         .catch(this.handleError);
    // }

    private handleError(err: HttpErrorResponse) {
        console.log(err.message);
        return observableThrowError(err.message);
    }
}