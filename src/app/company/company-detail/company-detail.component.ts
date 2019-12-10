import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ICompany, Company } from '../company';
import { MatDialog as M1, MatDialogRef as M2 } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { AppService } from '../../app.service';
import { RatingService } from '../../rating/rating.service';
import { IRating } from '../../rating/rating';
import { FormGroup, FormControl } from '@angular/forms';

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
  public form: FormGroup;
  public companyName = new FormControl();
  public addr1 = new FormControl();
  public addr2 = new FormControl();
  public city = new FormControl();
  public state = new FormControl();
  public rating = new FormControl();

  constructor(private _companyService: CompanyService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _appService: AppService,
    private _ratingService: RatingService,
    public dialog: M1) {
      this.form = new FormGroup({
        companyName: this.companyName,
        addr1: this.addr1,
        addr2: this.addr2,
        city: this.city,
        state: this.state,
        rating: this.rating
    });
  }

  ngOnInit(): void {
    let id = +this._route.snapshot.paramMap.get('id');

    if (id != 0) {
      this._companyService.getCompany(id)
        .subscribe(company => {
          this.company = company;
          // this.form.value = {companyName: company.companyName};
        },
          error => this.errorMessage = <any>error);
    } else {
      this.company = new Company();
      this.pageTitle = "New Company";
    }

    this._ratingService.getRatings()
      .subscribe(ratings => {
        this.ratings = ratings;
      },
        error => this.errorMessage += <any>error);

    this._appService.setTitle(this.pageTitle);

    this._appService.setMenuData({
      menuItems: []
    });
  }

  ratingSelection(ratingValue): void {
    console.log("Selected rating is: ", ratingValue);
    this.company.rating = ratingValue;
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
