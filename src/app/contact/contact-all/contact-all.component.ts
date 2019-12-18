import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { IContact } from '../contact';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'pm-contact-all',
  templateUrl: './contact-all.component.html',
  styleUrls: ['./contact-all.component.css']
})
export class ContactAllComponent implements OnInit {
  displayedColumns = ['fName', 'title'];
  contacts: IContact[] = [];
  errorMessage: string;
  public dataSource = new MatTableDataSource<IContact>();

  constructor(private _contactService: ContactService,
    private _router: Router,
    private _appService: AppService) { }

    @ViewChild(MatSort, { static: true }) tablesort: MatSort;

    ngOnInit() {
    this._contactService.getAllContacts()
      .subscribe(contacts => {
        this.contacts = contacts;
      },
        error => this.errorMessage = <any>error);

    this._appService.setTitle('All Contacts');

    this._appService.setMenuItems([
      { text: "All Companies", action: this.goToCompanies.bind(this) }
    ]);
  }

  ngAfterViewInit(): void {
    this._contactService.getAllContacts().subscribe(companies => {
      this.dataSource.data = companies;
      if (this.tablesort) // check it is defined.
      {
        this.dataSource.sort = this.tablesort;
      }
    });
  }

  goToCompanies() {
    this._router.navigateByUrl("/company");
  }
}
