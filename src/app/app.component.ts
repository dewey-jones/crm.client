import { Component } from '@angular/core';
import { ProductService } from './products/product.service';
import { CompanyService } from './company/company.service';
import { Router } from '@angular/router';

@Component ({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  providers: [ProductService, CompanyService]
})
export class AppComponent {
  pageTitle: string = 'CRM';

  constructor(private _router: Router) { }

  public goHome() {
    this._router.navigateByUrl('/')
  }

  public gotoCompany() {
    this._router.navigateByUrl('/company')
  }
}
