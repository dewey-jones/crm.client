import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICompany } from '../company';
import { CompanyService } from '../company.service';
import {AppService} from '../../app.service';

@Component({
  selector: 'pm-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  pageTitle: string = 'Company List';
  errorMessage: string;
  displayedColumns = ['companyName'];
  companies: ICompany[] = [];
  
  constructor(private _companyService: CompanyService,
    private _router: Router,
    private _appService: AppService) { }

  ngOnInit(): void {
    this._companyService.getCompanies()
        .subscribe(companies => {
            this.companies = companies;
        },
        error => this.errorMessage = <any>error);
  
    this._appService.setTitle(this.pageTitle);

    this._appService.setMenuData({
      menuItems: [
        {text: "Add Company", path: '/company/0'}
    ]});
  }

  addCompany(): void {
    this._router.navigate(['/company', 0])
  }

}
