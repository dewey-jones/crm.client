import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Router } from '@angular/router';

import { IContact, Contact } from '../contact';

@Component({
  selector: 'crm-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  pageTitle: string = 'Contact Detail';
  errorMessage: string;
  companyId: number;
  sub: any;  // subscription

  contact: IContact;

  constructor(private _contactService: ContactService, 
    private _route: ActivatedRoute, 
    private _router: Router) {
   }

   ngOnInit(): void {
    this.sub = this._route
      .queryParams
      .subscribe(params => {
        // Defaults companyId to 0 if no query param provided (new contact).
        this.companyId = +params['companyId'] || 0;
      });

    console.log(this._route.snapshot.paramMap.get('id'));
    let id = +this._route.snapshot.paramMap.get('id');
    this.pageTitle += `: ${id}`;
    if(id != 0) {
      this._contactService.getContact(id)
      .subscribe(contact => {
          this.contact = contact;
      },
      error => this.errorMessage = <any>error);
    } else {
      this.contact = new Contact();
    }
  }

  save(): void {
    console.log(this.contact);
    console.log(this._route.snapshot.paramMap.get('id'));
    let id = +this._route.snapshot.paramMap.get('id');
    // if new contact...
    if(id === 0) {
      this.contact.companyId = this.companyId
      this._contactService.createContact(this.contact)
        .subscribe(contact => {
            this.contact = contact;
        },
        error => this.errorMessage = <any>error);
    } else {
      this._contactService.updateContact(this.contact)
        .subscribe(contact => {
            this.contact = contact;
        },
        error => this.errorMessage = <any>error);
    }
  }
  
  delete(): void {
    console.log(this.contact);
    this._contactService.deleteContact(this.contact.id)
      .subscribe(company => {
          this.contact = company;
      },
      error => this.errorMessage = <any>error);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }



}
