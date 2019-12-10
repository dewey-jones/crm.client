import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ICompany, Company } from '../company';
import { MatDialog as M1, MatDialogRef as M2 } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { AppService } from '../../app.service';
import { RatingService } from '../../rating/rating.service';
import { IRating } from '../../rating/rating';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'crm-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {
  pageTitle: string = 'Company Detail';
  errorMessage: string;
  ratings: IRating[] = [];
  public selectedRating: number;
  company: ICompany;
  dialogRef: M2<ConfirmationDialogComponent>;
  public companyForm: FormGroup;

  constructor(private _companyService: CompanyService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _appService: AppService,
    private _ratingService: RatingService,
    public dialog: M1,
    private fb: FormBuilder) {
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
          var temp = this.assignMatching(this.companyForm.value, this.company);
          console.log("temp: ", temp);
          this.companyForm.setValue(temp);
        },
          error => this.errorMessage = <any>error);
    } else {
      this.company = new Company();
      this.pageTitle = "New Company";
    }

    this._ratingService.getRatings('value')
      .subscribe(ratings => {
        this.ratings = ratings;
      },
        error => this.errorMessage += <any>error);

    this._appService.setTitle(this.pageTitle);

    this._appService.setMenuData({
      menuItems: []
    });
  }

  assignMatching(obj1, obj2):object {
    //https://stackoverflow.com/a/40573612/426806
    return Object.keys(obj1).reduce((a, key) => ({ ...a, [key]: obj2[key]}), {});
  }

  setRatingValue(ratingValue): void {
    //this.company.ratingValue = ratingValue;
    // console.log("before: ", this.companyForm.controls.ratingValue);
    // Object.assign(this.companyForm.controls.ratingValue, {"value": ratingValue});
    // this.companyForm.controls.ratingValue.setValue(ratingValue);
    console.log("after: ", this.companyForm.controls.ratingValue);
  }

  getRatingName(ratingValue): string {
    var filteredRatings = this.ratings.filter(rating => rating.ratingValue == ratingValue);
    return filteredRatings[0].description || '';
  }

  save(): void {
    this._companyService.saveCompany(this.company)
      .subscribe(company => {
        this.company = company;
        console.log("In detail ", this.company);
      },
        error => this.errorMessage = <any>error);
  }

  back(): void {
    this._router.navigate(['/company']);
  }

  delete(): void {
    this._companyService.deleteCompany(this.company.id)
      .subscribe(company => {
        this.company = company;
        console.log(this.company);
      },
        error => this.errorMessage = <any>error);
  }

  openConfirmationDialog() {
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
