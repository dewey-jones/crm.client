import { Component } from '@angular/core';
import { ProductService } from './products/product.service';
import { CompanyService } from './company/company.service';

@Component ({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  providers: [ProductService, CompanyService]
})
export class AppComponent {
  pageTitle: string = 'CRM';
}
