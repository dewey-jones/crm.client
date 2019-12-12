import { Component, OnInit, AfterViewChecked } from '@angular/core';
// import { CompanyService } from './company/company.service';
import { Router } from '@angular/router';
import { AppService } from "./app.service";
import { MatMenuTrigger } from '@angular/material/menu';
import{ ChangeDetectorRef } from '@angular/core';

@Component ({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]
})
export class AppComponent implements OnInit, AfterViewChecked {
  trigger: MatMenuTrigger;
  pageTitle: string = 'CRM';
  menuItems: any[] = [];
  opened: boolean;

  constructor(private _router: Router,
    private appService: AppService,
    private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    // display page title in app bar
    // https://stackoverflow.com/questions/51286357/angular-display-title-of-selected-component/51287553#51287553
    this.appService.getTitle().subscribe(pageTitle => this.pageTitle = pageTitle);
    // https://stackoverflow.com/questions/58924441/angular-how-to-pass-callback-in-menu-item-on-parent-component-menu
    this.appService.getMenuItems().subscribe(newMenu => {
      this.menuItems = newMenu;
      console.log("this.menuItems", this.menuItems);
    });
  }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }
  
  public goHome(): void {
    this._router.navigateByUrl('/')
  }

  public gotoCompany(): void {
    this._router.navigateByUrl('/company')
  }

  public gotoRatings(): void {
    this._router.navigateByUrl('/rating')
  }

  openContextMenu(): void {
    this.trigger.openMenu();
  }

  routeToPath(path: string) {
    this._router.navigateByUrl(path)
  }

  performAction(action: any): void {
    action();
  }

  // ???
  isPageMenuDisabled() {
    console.log(this.menuItems);
    return this.menuItems.length = 0;
  }
}
