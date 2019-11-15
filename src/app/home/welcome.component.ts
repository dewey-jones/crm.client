import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    templateUrl: './welcome.component.html'
})
export class WelcomeComponent {
  public pageTitle: string = 'Welcome';

  constructor(private _router: Router) {
    }

  register(): void {
    this._router.navigate(['/register']);
  }

  login(): void {
    this._router.navigate(['/login']);
  }
}
