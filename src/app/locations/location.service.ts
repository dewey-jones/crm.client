
import {throwError as observableThrowError,  Observable } from 'rxjs';

import {catchError, tap} from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';




import { ILocation } from "./location";

@Injectable()
export class LocationService {
    private _locationUrl = environment.apiPath + '/api/Location/Get/';

    constructor(private _http: HttpClient) {}

    getLocations(): Observable<ILocation[]> {
        return this._http.get<ILocation[]>(this._locationUrl).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError),);
    }

    private handleError(err: HttpErrorResponse) {
        console.log(err.message);
        return observableThrowError(err.message);
    }
}