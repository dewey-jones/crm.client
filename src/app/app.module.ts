import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list.component';
import { ConvertToSpacesPipe } from './shared/convert-to-spaces.pipe';
import { StarComponent } from './shared/star.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { WelcomeComponent } from './home/welcome.component';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { CompanyDetailComponent } from './company/company-detail/company-detail.component';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';
import { CompanyService } from './company/company.service';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { ContactDetailComponent } from './contact/contact-detail/contact-detail.component';
import { ContactService } from './contact/contact.service';
import { NoteDetailComponent } from './note/note-detail/note-detail.component';
import { NoteListComponent } from './note/note-list/note-list.component';
import { NoteService } from './note/note.service';

import { AppMaterialModule } from './app-material/app-material.module';

import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
import { RegisterComponent } from './account/register/register.component';
import { LoginComponent } from './account/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductDetailComponent,
    ConvertToSpacesPipe,
    StarComponent,
    WelcomeComponent,
    CompanyListComponent,
    ContactListComponent,
    ContactDetailComponent,
    CompanyDetailComponent,
    CompanyEditComponent,
    NoteDetailComponent,
    NoteListComponent,
    ConfirmationDialogComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: 'products', component: ProductListComponent },
      { path: 'products/:id', component: ProductDetailComponent },
      { path: 'welcome', component: WelcomeComponent },
      { path: 'company', component: CompanyListComponent },
      { path: 'company/:id', component: CompanyDetailComponent },
      { path: 'contact', component: ContactListComponent },
      { path: 'contact/:id', component: ContactDetailComponent },
      { path: 'note', component: NoteListComponent },
      { path: 'note/:id', component: NoteDetailComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
    ])
    // MatButtonModule,
    // MatFormFieldModule,
    // MatInputModule,
    // MatRippleModule,
    // MatDialog,
    // MatDialogRef
  ],
  // exports: [
  //   MatDialog,
  //   MatDialogRef
  // ],
  providers: [ ContactService, CompanyService, NoteService ],
  bootstrap: [AppComponent],
  entryComponents: [ ConfirmationDialogComponent]
})
export class AppModule { }
