import { Injectable } from "@angular/core";
import { appSettings } from "../app-settings";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { IRating } from "./rating";

@Injectable()
export class RatingService {
    private _ratingUrl = appSettings.serverPath + '/api/rating';
    
    constructor(private _http: HttpClient) {}

    getRatings(contactId: number): Observable<IRating[]> {
        return this._http.get<IRating[]>(this._ratingUrl + "?sort=value")
        .do(data => console.log('All: ' + JSON.stringify(data)))
        .catch(this.handleError);
}
    /*
    getRating(id: number): Observable<IRating> {
        return this._http.get<IRating>(this._ratingUrl + "/" + id)
            .do(data => console.log('Rating: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    createRating(rating: IRating): any {
        const id = rating.id;
        console.log("URL", this._ratingUrl);
        return this._http.post(this._ratingUrl, rating)
            .do(data => console.log('Rating: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    updateRating(rating: IRating): any {
        const id = rating.id;
        console.log("in service", rating);
        console.log("URL", this._ratingUrl + "/" + id);
        return this._http.put(this._ratingUrl + "/" + id, rating)
            .do(data => console.log('Rating: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    deleteRating(id: number): any {
        return this._http.delete(this._ratingUrl + "/" + id)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
    */

    private handleError(err: HttpErrorResponse) {
        console.log(err.message);
        return Observable.throw(err.message);
    }
}