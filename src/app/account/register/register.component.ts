import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../_services/index';
import { AccountService } from '../account.service';
import { IRegistration } from '../registration';

@Component({
  selector: 'pm-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  pageTitle: string = 'Register';
  registration: IRegistration;
  
  constructor(
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService) { }

  ngOnInit() {
  }

  save() {
    // this.loading = true;
    this.accountService.register(this.registration)
        .subscribe(
            data => {
                // set success message and pass true paramater to persist the message after redirecting to the login page
                this.alertService.success('Registration successful', true);
                this.router.navigate(['/login']);
            },
            error => {
                this.alertService.error(error);
                // this.loading = false;
            });
}

}
