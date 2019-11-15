import { Component, OnInit } from '@angular/core';
import { ILogin, Login } from '../login';

@Component({
  selector: 'pm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: ILogin;

  constructor() { }

  ngOnInit() {
    this.login = new Login() ;
  }

}
