import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AppService} from '../app.service';

@Component({
    templateUrl: './welcome.component.html'
})
export class WelcomeComponent implements OnInit {
  public pageTitle: string = 'Home';

  constructor(private _router: Router,
    private _appService: AppService) { }

  ngOnInit(): void {
    this._appService.setTitle(this.pageTitle);
  }

  register(): void {
    this._router.navigate(['/register']);
  }

  login(): void {
    this._router.navigate(['/login']);
  }
}
