import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog as M1, MatDialogRef as M2 } from '@angular/material';
// import { 
//   MatButtonModule,
//   MatFormFieldModule,
//   MatInputModule,
//   MatRippleModule,
//   MatDialog,
//   MatDialogRef
// } from './../../app-material/app-material.module';

import { ICompany } from '../company';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {
  pageTitle: string = 'Company Detail';
  errorMessage: string;

  company: ICompany;
  dialogRef: M2<ConfirmationDialogComponent>;
  
  constructor(private _companyService: CompanyService, 
    private _route: ActivatedRoute, 
    private _router: Router,
    public dialog: M1) {
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
  openConfirmationDialog() {
    this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete?"

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.delete();
      }
      this.dialogRef = null;
    });
  }
}
