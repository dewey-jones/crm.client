import { Component, OnInit } from '@angular/core';
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
export class CompanyListComponent implements OnInit {
  pageTitle: string = 'Company List';
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

    this._ratingService.getRatings()
      .subscribe(ratings => {
        this.ratings = ratings;
      },
        error => this.errorMessage += <any>error);

    this._appService.setTitle(this.pageTitle);

    this._appService.setMenuData({
      menuItems: [
        { text: "Add Company", path: '/company/0' }
      ]
    });
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
    this._router.navigate(['/company', 0])
  }

  getRating(ratingNumber: number): any {
    var filteredRating = this.ratings.filter(function (item) {
      return item.ratingValue == ratingNumber;
    });
    this.ratingFromService = filteredRating[0].description;
  }

  getIconName(ratingNumber: number): any {
    var filteredRating = this.ratings.filter(function (item) {
      return item.ratingValue == ratingNumber;
    });
    return (filteredRating && filteredRating[0]) ? filteredRating[0].iconName : "";
  }
}
