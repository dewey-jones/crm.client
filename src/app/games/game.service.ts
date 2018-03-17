import { Injectable } from "@angular/core";
import { appSettings } from "../app-settings";
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { IGame } from "./game";

@Injectable()
export class GameService {
    private _seasonGamesUrl = appSettings.serverPath + '/api/Game/GetSeasonGames/';
    
    constructor(private _http: HttpClient) {}

    getSeasonGames(seasonId): Observable<IGame[]> {
        const params = new HttpParams().set('id', seasonId);
        return this._http.get<IGame[]>(this._seasonGamesUrl, {params: params})
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(err: HttpErrorResponse) {
        console.log(err.message);
        return Observable.throw(err.message);
    }
}