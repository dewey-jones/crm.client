import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IRating } from "../rating";
import { RatingService } from '../rating.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'crm-rating-list',
  templateUrl: './rating-list.component.html',
  styleUrls: ['./rating-list.component.css']
})
export class RatingListComponent implements OnInit, OnChanges {
  @Input() contactId: number;
  displayedColumns = ['ratingvalue', 'description'];
  ratings: IRating[] = [];
  summarizedRatings: IRating[] = [];
  errorMessage: string;
  
  constructor(private _ratingService: RatingService,
    private _router: Router) { }

  ngOnInit() {
    console.log(this.contactId);
    this._ratingService.getRatings(this.contactId)
        .subscribe(ratings => {
            this.ratings = ratings;
          },
          error => this.errorMessage = <any>error);
  }

/*
  addRating(): void {
    this._router.navigate(['/rating', 0], { queryParams: { contactId: this.contactId } })
  }
*/
  ngOnChanges() {

  }

}
