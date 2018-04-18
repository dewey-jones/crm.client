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
  selectedVal: string;

  constructor(private _router: Router) { }

  public onValChange(val: string) : void {
    this.selectedVal = val;
    const navArray = [];
    navArray.push(val);
    this._router.navigate(navArray);
  
  }
}
