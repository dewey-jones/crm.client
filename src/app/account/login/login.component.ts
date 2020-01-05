import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, tap } from 'rxjs/operators';

import { ILogin, Login } from '../login';
import { IRegistration, Registration } from '../registration';
import { AccountService } from '../account.service';
import {Location} from '@angular/common';

@Component({
  selector: 'pm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: ILogin;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private location: Location
  ) {
    // redirect to home if already logged in
    if (this.accountService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  save() {
    //https://stackoverflow.com/questions/41922466/redirect-user-with-router-depending-on-logged-in-status
    // if (this.registration.userName == "dwjones" && this.registration.password == "1234Crm") {
    //   this._accountService.setCurrentUser(this.registration.userName, this.registration.password);
    // }
  }
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.login = new Login(this.f.username.value, this.f.password.value);
    console.log("Login values ", this.loginForm.value);
    this.accountService.login(this.loginForm.value)
      .pipe(first(), 
        tap(data => console.log('All: ' + JSON.stringify(data))))
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.loading = false;
        });
  }

  back() {
    this.location.back();
  }
}