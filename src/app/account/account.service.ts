
import { throwError as observableThrowError, BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { appSettings } from "../app-settings";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IRegistration } from "./registration";
import { ILogin } from './login';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private _accountUrl = appSettings.serverPath + '/api/account';
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private _http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  register(registration: IRegistration): any {
    console.log("registration", registration);
    return this._http.post<IRegistration>(this._accountUrl, registration).pipe(
      tap(data => console.log('Registered: ' + JSON.stringify(data))),
      catchError(this.handleError));
  }

  login(login: ILogin): any {
    console.log("login", login);
    return this._http.post<ILogin>(this._accountUrl, login)
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        // re-enable this
        //this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return observableThrowError(err.message);
  }
}