import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { CompanyService } from '../../company/company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IContact, Contact } from '../contact';
import { ICompany } from '../../company/company';

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
  company: ICompany;

  constructor(private _contactService: ContactService, 
    private _companyService: CompanyService,
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
          this.companyId = contact.companyId;
          console.log("companyId is", this.companyId);
        },
      error => this.errorMessage = <any>error,
      () => this._companyService.getCompany(this.companyId)
      .subscribe(company => {
        this.company = company;
        console.log("companyName is", this.company.companyName);
        this.pageTitle = this.company.companyName;
      })
      )
    } else {
      this.contact = new Contact();
      this.pageTitle = "New Contact";
    };
  }

  save(): void {
    console.log(this.contact);
    console.log(this._route.snapshot.paramMap.get('id'));
    let contactId = +this._route.snapshot.paramMap.get('id');
    // if new contact...
    if(contactId === 0) {
      this.contact.companyId = this.companyId;
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
    console.log("route", '/company/' + this.companyId);
    this._router.navigate(['/company/', this.companyId]);
  }

  back(): void {
    this._router.navigate(['/company/', this.companyId]);
  }
  
  delete(): void {
    console.log(this.contact);
    this._contactService.deleteContact(this.contact.id)
      .subscribe(company => {
          this.contact = company;
      },
      error => this.errorMessage = <any>error);
  }

  onShouldContactChange(value): void {
    this.contact.shouldContact = value;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }



}
