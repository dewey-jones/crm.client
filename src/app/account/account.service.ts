
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
          tap(data => console.log('Registered: ' + JSON.stringify(data))),
          catchError(this.handleError),);
    }

    private handleError(err: HttpErrorResponse) {
        console.log(err.message);
        return observableThrowError(err.message);
    }
}