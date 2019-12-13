import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { CompanyService } from '../../company/company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IContact, Contact } from '../contact';
import { ICompany } from '../../company/company';
import { AppService } from '../../app.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataUtilities } from '../../utilities';
import { MatDialog as M1, MatDialogRef as M2 } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';

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
  dialogRef: M2<ConfirmationDialogComponent>;
  public contactForm: FormGroup;

  constructor(private _contactService: ContactService,
    private _companyService: CompanyService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _appService: AppService,
    public dialog: M1,
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

    this._appService.setMenuItems([
      { text: "Delete Contact", action: this.openDeleteDialog.bind(this) }
    ]);
  }

  save(): void {
    console.log(this.contact);
    console.log(this._route.snapshot.paramMap.get('id'));
    let contactId = +this._route.snapshot.paramMap.get('id');
    var updatedContact = Object.assign(this.contact, this.contactForm.value);
    // if new contact...
    if (contactId === 0) {
      updatedContact.companyId = this.companyId;
      this._contactService.createContact(updatedContact)
        .subscribe(contact => {
          this.contact = contact;
          this.backToList();
        },
          error => this.errorMessage = <any>error);
    } else {
      this._contactService.updateContact(updatedContact)
        .subscribe(contact => {
          this.contact = contact;
          this.backToList();
        },
          error => this.errorMessage = <any>error);
    }
  }

  backToList(): void {
    this._router.navigate(['/company/', this.companyId]);
  }

  delete(): void {
    this._contactService.deleteContact(this.contact.id)
      .subscribe(company => {
        this.contact = company;
        this.backToList();
      },
        error => this.errorMessage = <any>error);
  }

  openDeleteDialog() {
    this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete?"

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete();
      }
      this.dialogRef = null;
    });
  }

  onShouldContactChange(value): void {
    this.contact.shouldContact = value;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
