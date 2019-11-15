import { Component } from '@angular/core';
import { CompanyService } from './company/company.service';
import { Router } from '@angular/router';
import { AppService } from "./app.service"

@Component ({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  providers: [CompanyService, AppService]
})
export class AppComponent {
  pageTitle: string = 'CRM';

  constructor(private _router: Router, private appService: AppService) { }

  // display page title in app bar
  // https://stackoverflow.com/questions/51286357/angular-display-title-of-selected-component/51287553#51287553
  ngOnInit() {
    this.appService.getTitle().subscribe(pageTitle => this.pageTitle = pageTitle);
  }
  
  public goHome() {
    this._router.navigateByUrl('/')
  }

  public gotoCompany() {
    this._router.navigateByUrl('/company')
  }
}
