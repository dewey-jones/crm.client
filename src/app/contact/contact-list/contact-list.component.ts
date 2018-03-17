import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IContact } from "../contact";
import { ContactService } from '../contact.service';

@Component({
  selector: 'crm-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnChanges {
  @Input() companyId: number;

  contacts: IContact[] = [];
  errorMessage: string;
  
  constructor(private _contactService: ContactService,
    private _router: Router) { }

  ngOnInit() {
    console.log(this.companyId);
    this._contactService.getContacts(this.companyId)
        .subscribe(contacts => {
            this.contacts = contacts;
        },
        error => this.errorMessage = <any>error);
    
  }

  addContact(): void {
    this._router.navigate(['/contact', 0], { queryParams: { companyId: this.companyId } })
  }

  ngOnChanges() {

  }

}
