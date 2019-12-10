import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { AlertService } from '../_services/index';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService } from '../account.service';
import { IRegistration } from '../registration';
import { AlertService } from '../../shared/alerts';
// import { AlertService, UserService, AuthenticationService } from '@/_services';

@Component({
  selector: 'pm-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  pageTitle: string = 'Register';
  registration: IRegistration;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService,
    private accountService: AccountService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.accountService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/login']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  /*     // this.loading = true;
      this.accountService.register(this.registration)
        .subscribe(
          data => {
            // set success message and pass true paramater to persist the message after redirecting to the login page
            // this.alertService.success('Registration successful', true);
            this.router.navigate(['/login']);
          },
          error => {
            // this.alertService.error(error);
            // this.loading = false;
          });
    }
   */
}
