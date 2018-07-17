import { Component, OnInit } from '@angular/core';
import { ILocation } from '../location';
import { Router } from '@angular/router';
import { LocationService } from '../location.service';

@Component({
  selector: 'cs-note-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit {
  pageTitle: string = 'Location List';
  displayedColumns = ['contactDate', 'noteText'];
  errorMessage: string;

  locations: ILocation[] = [];

  constructor(private _locationService: LocationService,
    private _router: Router) {
  }

  ngOnInit(): void {
    this._locationService.getLocations()
        .subscribe(locations => {
            this.locations = locations;
        },
        error => this.errorMessage = <any>error);
      }
}
