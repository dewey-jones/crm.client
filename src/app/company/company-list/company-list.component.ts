import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICompany } from '../company';
import { CompanyService } from '../company.service';
import { AppService } from '../../app.service';
import { RatingService } from '../../rating/rating.service';
import { IRating } from '../../rating/rating';

@Component({
  selector: 'pm-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  pageTitle: string = 'Company List';
  errorMessage: string;
  displayedColumns = ['companyName', 'rating'];
  companies: ICompany[] = [];
  ratings: IRating[] = [];
  ratingFromService: string;

  constructor(private _companyService: CompanyService,
    private _ratingService: RatingService,
    private _router: Router,
    private _appService: AppService) { }

  ngOnInit(): void {
    this._companyService.getCompanies()
      .subscribe(companies => {
        this.companies = companies;
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

  addCompany(): void {
    this._router.navigate(['/company', 0])
  }

  getRating(ratingNumber: number): any {
    var filteredRating = this.ratings.filter(function (item) {
      return item.ratingValue == ratingNumber;
    });
    this.ratingFromService = filteredRating[0].description;
  }

  getIcon(ratingNumber: number): any {
    var iconMap = {
      "1": "arrow_upward",
      "2": "how_to_reg",
      "3": "person",
      "4": "person_outline",
      "5": "date_range",
      "6": "help_outline",
      "7": "cancel",
      "8": "flight",
  }
  }
}
