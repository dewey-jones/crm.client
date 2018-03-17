import { Injectable } from "@angular/core";
import { appSettings } from "../app-settings";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { ICompany } from "./company";

@Injectable()
export class CompanyService {
    private _companyUrl = appSettings.serverPath + '/api/company';
    
    constructor(private _http: HttpClient) {}

    getCompanies(): Observable<ICompany[]> {
        return this._http.get<ICompany[]>(this._companyUrl)
            .catch(this.handleError);
    }

    getCompany(id: number): Observable<ICompany> {
        return this._http.get<ICompany>(this._companyUrl + "/" + id)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    saveCompany(company: ICompany): any {
        const id = company.id;
        console.log("in service", company);
        console.log("URL", this._companyUrl + "/" + id);
        return this._http.put(this._companyUrl + "/" + id, company)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    deleteCompany(id: number): any {
        return this._http.delete(this._companyUrl + "/" + id)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(err: HttpErrorResponse) {
        console.log(err.message);
        return Observable.throw(err.message);
    }
}