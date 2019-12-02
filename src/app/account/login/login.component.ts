import { Component, OnInit } from '@angular/core';
import { ILogin, Login } from '../login';
import { IRegistration, Registration } from '../registration';

@Component({
  selector: 'pm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: ILogin;
  registration: IRegistration;

  constructor() { }

  ngOnInit() {
    this.login = new Login() ;

    this.registration = new Registration();
  }

  save() {}

  back() {}

}
