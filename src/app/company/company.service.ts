
import {throwError as observableThrowError,  Observable } from 'rxjs';

import {tap, catchError} from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { appSettings } from "../app-settings";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';




import { ICompany } from "./company";

@Injectable()
export class CompanyService {
    private _companyUrl = appSettings.serverPath + '/api/company';
    
    constructor(private _http: HttpClient) {}

    getCompanies(): Observable<ICompany[]> {
        return this._http.get<ICompany[]>(this._companyUrl).pipe(
            catchError(this.handleError));
    }

    getCompany(id: number): Observable<ICompany> {
        return this._http.get<ICompany>(this._companyUrl + "/" + id).pipe(
            catchError(this.handleError),);
    }

    saveCompany(company: ICompany): any {
        const id = company.id;
        return this._http.put(this._companyUrl + "/" + id, company).pipe(
            catchError(this.handleError),);
    }

    deleteCompany(id: number): any {
        return this._http.delete(this._companyUrl + "/" + id).pipe(
            catchError(this.handleError),);
    }

    private handleError(err: HttpErrorResponse) {
        return observableThrowError(err.message);
    }
}