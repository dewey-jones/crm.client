import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from "./app.service";
import { MatMenuTrigger } from '@angular/material/menu';
import{ ChangeDetectorRef } from '@angular/core';
import { MatDrawer, 
  MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBarModule } from '@angular/material';
  import { NotificationService } from './shared/notificationService';

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
  drawer: MatDrawer;

  snackBarConfig: MatSnackBarConfig;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  snackBarAutoHide = '1500';

  constructor(private _router: Router,
    private appService: AppService,
    private changeDetector: ChangeDetectorRef,
    private notificationService: NotificationService,
    private snackBar: MatSnackBar) {
      this.notificationService.notification$.subscribe(message => {
        this.openSnackBar(message);
      });
     }

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
    this._router.navigateByUrl('/');
    //this.drawer.close();
  }

  public gotoCompany(): void {
    this._router.navigateByUrl('/company')
    //this.trigger.closeMenu();
  }

  public gotoRatings(): void {
    this._router.navigateByUrl('/rating')
    //this.trigger.closeMenu();
  }

  public gotoAllContacts(): void {
    this._router.navigateByUrl('/contacts')
    //this.trigger.closeMenu();
  }

  // openContextMenu(): void {
  //   this.trigger.openMenu();
  // }

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

  openSnackBar(message) {
    this.snackBarConfig = new MatSnackBarConfig();
    this.snackBarConfig.horizontalPosition = this.horizontalPosition;
    this.snackBarConfig.verticalPosition = this.verticalPosition;
    this.snackBarConfig.duration = parseInt(this.snackBarAutoHide, 0);
    this.snackBarConfig.panelClass = 'snackbar-class';
    //this.snackBarConfig.panelClass = 'glam-snackbar';
    this.snackBar.open(message, undefined, this.snackBarConfig);
  }

}
