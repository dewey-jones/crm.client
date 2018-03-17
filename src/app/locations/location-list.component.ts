import { Component, OnInit } from '@angular/core';
import {ILocation} from './location';
import { LocationService } from './location.service';

@Component({
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit {
  pageTitle: string = 'Location List';
  errorMessage: string;
  
  locations: ILocation[] = [];
  
  constructor(private _locationService: LocationService) {
  }
    
  ngOnInit(): void {
    this._locationService.getLocations()
        .subscribe(locations => {
            this.locations = locations;
        },
        error => this.errorMessage = <any>error);
      }
}
