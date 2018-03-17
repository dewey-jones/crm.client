import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { ActivatedRoute, Router } from '@angular/router';

import { ICompany } from '../company';

@Component({
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {
  pageTitle: string = 'Company Detail';
  errorMessage: string;

  company: ICompany;
  
  constructor(private _companyService: CompanyService, 
    private _route: ActivatedRoute, 
    private _router: Router) {
   }
  
  ngOnInit(): void {
    console.log(this._route.snapshot.paramMap.get('id'));
    let id = +this._route.snapshot.paramMap.get('id');
    //this.pageTitle += `: ${id}`;
    this._companyService.getCompany(id)
        .subscribe(company => {
            this.company = company;
        },
        error => this.errorMessage = <any>error);
  }
  save(): void {
    console.log(this.company);
    this._companyService.saveCompany(this.company)
      .subscribe(company => {
          this.company = company;
      },
      error => this.errorMessage = <any>error);
  }
  delete(): void {
    console.log(this.company);
    this._companyService.deleteCompany(this.company.id)
      .subscribe(company => {
          this.company = company;
      },
      error => this.errorMessage = <any>error);
  }

}
