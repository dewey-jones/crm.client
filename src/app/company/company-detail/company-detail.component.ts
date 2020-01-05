import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ICompany, Company } from '../company';
import { MatDialog as M1, MatDialogRef as M2 } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { AppService } from '../../app.service';
import { RatingService } from '../../rating/rating.service';
import { IRating } from '../../rating/rating';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataUtilities } from '../../utilities';
import { Constants } from '../../shared/constants';
import { NotificationService } from '../../shared/notificationService';

@Component({
  selector: 'crm-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {
  pageTitle: string = 'Company Detail';
  ratings: IRating[] = [];
  company: ICompany;
  dialogRef: M2<ConfirmationDialogComponent>;
  public companyForm: FormGroup;

  constructor(private _companyService: CompanyService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _appService: AppService,
    private _ratingService: RatingService,
    public dialog: M1,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private dataUtilities: DataUtilities) {
    this.companyForm = this.fb.group({
      companyName: [''],
      addr1: [''],
      addr2: [''],
      city: [''],
      state: [''],
      ratingValue: ['']
    });
  }

  ngOnInit(): void {
    let id = +this._route.snapshot.paramMap.get('id');
    if (id != 0) {
      this._companyService.getCompany(id)
        .subscribe(company => {
          this.company = company;
          var temp = this.dataUtilities.assignMatching(this.companyForm.value, this.company);
          this.companyForm.setValue(temp);
        },
          error => {
            this.notificationService.notification$.next(Constants.FAILED_TO_LOAD + "company");
          });
    } else {
      this.company = new Company();
      this.companyForm.controls.state.setValue('CO');
      this.pageTitle = "New Company";
    }

    this._ratingService.getRatings('value')
      .subscribe(ratings => {
        this.ratings = ratings;
      },
        error => this.notificationService.notification$.next(Constants.FAILED_TO_LOAD + "company")
    );

    this._appService.setTitle(this.pageTitle);

    this._appService.setMenuItems([
      { text: "Add Company", action: this.add.bind(this) },
      { text: "Delete Company", action: this.openDeleteDialog.bind(this) }
    ]);
  }

  getRatingName(ratingValue): string {
    if (this.ratings.length && ratingValue) {
      var filteredRatings = this.ratings.filter(rating => rating.ratingValue == ratingValue);
      return filteredRatings[0].description;
    } else {
      return '';
    }
  }

  save(): void {
    var updatedCompany = Object.assign(this.company, this.companyForm.value);
    let companyId = +this._route.snapshot.paramMap.get('id');
    if (companyId == 0) {
      this._companyService.createCompany(updatedCompany)
        .subscribe(company => {
          this.company = company;
          this.notificationService.notification$.next(Constants.SAVED_MESSAGE);
        },
          error => {
            this.notificationService.notification$.next(Constants.FAILED_SAVE_MESSAGE);
          });
    } else {
      this._companyService.updateCompany(updatedCompany)
        .subscribe(company => {
          this.company = company;
          this.notificationService.notification$.next(Constants.SAVED_MESSAGE);
        },
          error => {
            this.notificationService.notification$.next(Constants.FAILED_SAVE_MESSAGE);
          });
    }
  }

  add(): void {
    this._router.navigate(['/company', 0])
  }

  delete(): void {
    this._companyService.deleteCompany(this.company.id)
      .subscribe(company => {
        this.company = company;
        this.notificationService.notification$.next(Constants.DELETED);
        this.backToList();
      },
        error => this.notificationService.notification$.next(Constants.FAILED_TO_DELETE));
  }

  backToList(): void {
    console.log("back to list");
    this._router.navigate(['/company']);
  }

  openDeleteDialog() {
    this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete?"

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete();
      }
      this.dialogRef = null;
    });
  }
}
