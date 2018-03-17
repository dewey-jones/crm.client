import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { IAttend } from "./attend";

@Injectable()
export class AttendanceService {
    private _attendanceUrl = '';

    constructor(private _http: HttpClient) {}

    getProducts(): Observable<IAttend[]> {
        return this._http.get<IAttend[]>(this._attendanceUrl)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(err: HttpErrorResponse) {
        console.log(err.message);
        return Observable.throw(err.message);
    }
}