import { Component } from '@angular/core';
import { CompanyService } from './company/company.service';
import { Router } from '@angular/router';
import { AppService } from "./app.service";
import { MatMenuTrigger } from '@angular/material';
// import { MatSidenavContainer as sidenavContainer, MatDialogRef as M2 } from '@angular/material';

@Component ({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CompanyService, AppService]
})
export class AppComponent {
  trigger: MatMenuTrigger;
  pageTitle: string = 'CRM';
  menuData: any = [{}];
  opened: boolean;

  constructor(private _router: Router, private appService: AppService) { }

  // display page title in app bar
  // https://stackoverflow.com/questions/51286357/angular-display-title-of-selected-component/51287553#51287553
  ngOnInit() {
    this.appService.getTitle().subscribe(pageTitle => this.pageTitle = pageTitle);
    this.appService.getMenuData().subscribe(menuData => this.menuData = menuData);
  }
  
  public goHome() {
    this._router.navigateByUrl('/')
  }

  public gotoCompany() {
    this._router.navigateByUrl('/company')
  }

  openContextMenu() {
    this.trigger.openMenu();
  }
}
