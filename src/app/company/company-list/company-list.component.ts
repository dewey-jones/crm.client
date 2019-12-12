import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICompany } from '../company';
import { CompanyService } from '../company.service';
import { AppService } from '../../app.service';
import { RatingService } from '../../rating/rating.service';
import { IRating } from '../../rating/rating';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'pm-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit, AfterViewInit {
  //pageTitle: string = 'Company List';
  errorMessage: string;
  public displayedColumns = ['companyName', 'rating'];
  // companies: ICompany[] = [];
  ratings: IRating[] = [];
  ratingFromService: string;
  public dataSource = new MatTableDataSource<ICompany>();

  constructor(private _companyService: CompanyService,
    private _ratingService: RatingService,
    private _router: Router,
    private _appService: AppService) { }

  @ViewChild(MatSort, { static: true }) tablesort: MatSort;

  ngOnInit(): void {
    this._companyService.getCompanies()
      .subscribe(companies => {
        this.dataSource.data = companies;
      },
        error => this.errorMessage += <any>error);

    this._ratingService.getRatings('value')
      .subscribe(ratings => {
        this.ratings = ratings;
      },
        error => this.errorMessage += <any>error);

    this._appService.setTitle('Company List');

    this._appService.setMenuItems([
      { text: "Add Company", action: this.addCompany.bind(this) }
    ]);
  }

  ngAfterViewInit(): void {
    this._companyService.getCompanies().subscribe(companies => {
      this.dataSource.data = companies;
      if (this.tablesort) // check it is defined.
      {
        this.dataSource.sort = this.tablesort;
      }
    });
  }

  addCompany(): void {
    console.log("in addCompany");
    this._router.navigate(['/company', 0])
  }

  getRating(ratingValue: number): any {
    var filteredRating = this.ratings.filter(function (item) {
      return item.ratingValue == ratingValue;
    });
    this.ratingFromService = filteredRating[0].description;
  }

  getIconName(ratingValue: number): any {
    var filteredRating = this.ratings.filter(function (item) {
      return item.ratingValue == ratingValue;
    });
    return (filteredRating && filteredRating[0]) ? filteredRating[0].iconName : "";
  }
}
