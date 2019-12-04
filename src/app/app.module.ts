import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ConvertToSpacesPipe } from './shared/convert-to-spaces.pipe';
import { StarComponent } from './shared/star.component';
import { WelcomeComponent } from './home/welcome.component';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { CompanyDetailComponent } from './company/company-detail/company-detail.component';
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
import { AppRoutingModule } from './app-routing.module';
import { RatingListComponent } from './rating/rating-list/rating-list.component';
import { RatingService } from './rating/rating.service';

@NgModule({
  declarations: [
    AppComponent,
    ConvertToSpacesPipe,
    StarComponent,
    WelcomeComponent,
    CompanyListComponent,
    ContactListComponent,
    ContactDetailComponent,
    CompanyDetailComponent,
    NoteDetailComponent,
    NoteListComponent,
    RatingListComponent,
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
    AppRoutingModule
  ],
  providers: [ ContactService, CompanyService, NoteService, RatingService ],
  bootstrap: [AppComponent],
  entryComponents: [ ConfirmationDialogComponent]
})
export class AppModule { }
