import { Component, OnInit } from '@angular/core';
import { ILogin, Login } from '../login';
import { IRegistration, Registration } from '../registration';
import { AccountService } from '../account.service';

@Component({
  selector: 'pm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: ILogin;
  registration: IRegistration;

  constructor(private _accountService: AccountService) { }

  ngOnInit() {
    this.login = new Login() ;

    this.registration = new Registration();
  }

  save() {
    //https://stackoverflow.com/questions/41922466/redirect-user-with-router-depending-on-logged-in-status
    // if (this.registration.userName == "dwjones" && this.registration.password == "1234Crm") {
    //   this._accountService.setCurrentUser(this.registration.userName, this.registration.password);
    // }
  }

  back() {}

}
