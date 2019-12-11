import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { CompanyService } from '../../company/company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IContact, Contact } from '../contact';
import { ICompany } from '../../company/company';
import { AppService } from '../../app.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataUtilities } from '../../utilities';

@Component({
  selector: 'crm-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  errorMessage: string;
  companyId: number;
  sub: any;  // subscription
  contact: IContact;
  company: ICompany;
  public contactForm: FormGroup;

  constructor(private _contactService: ContactService,
    private _companyService: CompanyService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _appService: AppService,
    private fb: FormBuilder,
    private dataUtilities: DataUtilities) {
    this.contactForm = this.fb.group({
      fName: [''],
      lName: [''],
      title: [''],
      phone: [''],
      ext: [''],
      email: [''],
      shouldContact: ['']
    });
  }

  ngOnInit(): void {
    this.sub = this._route
      .queryParams
      .subscribe(params => {
        // Defaults companyId to 0 if no query param provided (new contact).
        this.companyId = +params['companyId'] || 0;
      });

    let id = +this._route.snapshot.paramMap.get('id');

    if (id != 0) {
      this._contactService.getContact(id)
        .subscribe(contact => {
          this.contact = contact;
          var temp = this.dataUtilities.assignMatching(this.contactForm.value, this.contact);
          this.contactForm.setValue(temp);
          this.companyId = contact.companyId;
        },
          error => this.errorMessage = <any>error,
          () => this._companyService.getCompany(this.companyId)
            .subscribe(company => {
              this.company = company;
            })
        )
      this._appService.setTitle('Contact Detail');
    } else {
      this.contact = new Contact();
      this._appService.setTitle('New Contact');
    };
  }

  save(): void {
    console.log(this.contact);
    console.log(this._route.snapshot.paramMap.get('id'));
    let contactId = +this._route.snapshot.paramMap.get('id');
    var updatedContact = Object.assign(this.contact, this.contactForm.value);
    // if new contact...
    if (contactId === 0) {
      this.contact.companyId = this.companyId;
      this._contactService.createContact(updatedContact)
        .subscribe(contact => {
          this.contact = contact;
          console.log("route", '/company/' + this.companyId);
          this._router.navigate(['/company/', this.companyId]);
        },
          error => this.errorMessage = <any>error);
    } else {
      this._contactService.updateContact(updatedContact)
        .subscribe(contact => {
          this.contact = contact;
          console.log("route", '/company/' + this.companyId);
          this._router.navigate(['/company/', this.companyId]);
        },
          error => this.errorMessage = <any>error);
    }
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
