import { Injectable } from "@angular/core";
import { appSettings } from "../app-settings";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { ILocation } from "./location";

@Injectable()
export class LocationService {
    private _locationUrl = appSettings.serverPath + '/api/Location/Get/';

    constructor(private _http: HttpClient) {}

    getLocations(): Observable<ILocation[]> {
        return this._http.get<ILocation[]>(this._locationUrl)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(err: HttpErrorResponse) {
        console.log(err.message);
        return Observable.throw(err.message);
    }
}