import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './account/register/register.component';
import { LoginComponent } from './account/login/login.component';
import { WelcomeComponent } from './home/welcome.component';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { CompanyDetailComponent } from './company/company-detail/company-detail.component';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { ContactDetailComponent } from './contact/contact-detail/contact-detail.component';
import { NoteListComponent } from './note/note-list/note-list.component';
import { NoteDetailComponent } from './note/note-detail/note-detail.component';
import { RatingListComponent } from './rating/rating-list/rating-list.component';
import { ContactAllComponent } from './contact/contact-all/contact-all.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'company', component: CompanyListComponent },
  { path: 'company/:id', component: CompanyDetailComponent },
  { path: 'contacts', component: ContactAllComponent },
  { path: 'contact', component: ContactListComponent },
  { path: 'contact/:id', component: ContactDetailComponent },
  { path: 'note', component: NoteListComponent },
  { path: 'note/:id', component: NoteDetailComponent },
  { path: 'rating', component: RatingListComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

