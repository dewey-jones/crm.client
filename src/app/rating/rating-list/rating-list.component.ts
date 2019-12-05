import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IRating } from "../rating";
import { RatingService } from '../rating.service';
import { DatePipe } from '@angular/common';
import { AppService } from '../../app.service';

@Component({
  selector: 'crm-rating-list',
  templateUrl: './rating-list.component.html',
  styleUrls: ['./rating-list.component.css']
})
export class RatingListComponent implements OnInit, OnChanges {
  pageTitle: string = 'Rating List';
  displayedColumns = ['ratingValue', 'description'];
  ratings: IRating[] = [];
  summarizedRatings: IRating[] = [];
  errorMessage: string;
  
  constructor(private _ratingService: RatingService,
    private _router: Router,
    private _appService: AppService) { }

  ngOnInit() {
    this._ratingService.getRatings()
        .subscribe(ratings => {
            this.ratings = ratings;
          },
          error => this.errorMessage = <any>error);

          this._appService.setTitle(this.pageTitle);
  }

/*
  addRating(): void {
    this._router.navigate(['/rating', 0], { queryParams: { contactId: this.contactId } })
  }
*/
  ngOnChanges() {

  }

}
