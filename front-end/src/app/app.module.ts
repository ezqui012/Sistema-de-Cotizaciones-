import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterUserAdministrativeComponent } from './register-user-administrative/register-user-administrative.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule} from 'ngx-toastr';
import { LoginComponent } from './login/login.component';
import { RolesListComponent } from './roles-list/roles-list.component';
import { CreateRolComponent } from './create-rol/create-rol.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { EditRolComponent } from './edit-rol/edit-rol.component';
import {MatSelectModule} from '@angular/material/select';
import { UnitsRegisterComponent } from './units-register/units-register.component';
import {MatRadioModule} from '@angular/material/radio';
import { NavbarOutsideComponent } from './navbar-outside/navbar-outside.component';
import { InfoSiteComponent } from './info-site/info-site.component';
import { ContactComponent } from './contact/contact.component';
import { SupportComponent } from './support/support.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { SchoolListComponent } from './school-list/school-list.component';
import { SchoolCreateComponent } from './school-create/school-create.component';
import { SchoolEditComponent } from './school-edit/school-edit.component';
import { MatCardModule } from '@angular/material/card';
import { UserListComponent } from './user-list/user-list.component';
import { AdministrativasComponent } from './administrativas/administrativas.component';
import { EditarComponent } from './editar/editar.component';
import { ListQuotesComponent } from './list-quotes/list-quotes.component';
import { ComparativeQuotesComponent } from './comparative-quotes/comparative-quotes.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { PasswordComponent } from './PopUp/password/password.component';
import { EditUnitComponent } from './edit-unit/edit-unit.component';
import { QuoteListProcessComponent } from './quote-list-process/quote-list-process.component';
import { QuoteListFinalizedComponent } from './quote-list-finalized/quote-list-finalized.component';
import { QuoteFormComponent } from './quote-form/quote-form.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RequestQuotationComponent } from './request-quotation/request-quotation.component';
import { RequestQuotationListComponent } from './request-quotation-list/request-quotation-list.component';
import { RequestQuotationEditComponent } from './request-quotation-edit/request-quotation-edit.component';
import { RequestDetailComponent } from './request-detail/request-detail.component';
import { QuoteListComponent } from './quote-list/quote-list.component';
import { NavUserComponent } from './nav-user/nav-user.component';
import { HomeUserComponent } from './home-user/home-user.component';
import { EditDetailQuotationComponent } from './edit-detail-quotation/edit-detail-quotation.component';
import { RequestDetailRejectedComponent } from './request-detail-rejected/request-detail-rejected.component';
import { RequestDetailQuoteComponent } from './request-detail-quote/request-detail-quote.component';
import { RequestDetailApprovedComponent } from './request-detail-approved/request-detail-approved.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyRegisterComponent } from './company-register/company-register.component';
import { CompanyEditComponent } from './company-edit/company-edit.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemRegisterComponent } from './item-register/item-register.component';
import { ItemEditComponent } from './item-edit/item-edit.component';
import { PdfMakeWrapper } from 'pdfmake-wrapper';
//import pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

// Set the fonts to use
PdfMakeWrapper.setFonts(pdfFonts);
import { NgxDropzoneModule } from 'ngx-dropzone';

import { FilterPipe } from './pipes/filter.pipe';

import { NgxSpinnerModule } from "ngx-spinner";
import { ListBudgetComponent } from './list-budget/list-budget.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterUserAdministrativeComponent,
    LoginComponent,
    RolesListComponent,
    CreateRolComponent,
    NavbarComponent,
    EditRolComponent,
    UnitsRegisterComponent,
    NavbarOutsideComponent,
    InfoSiteComponent,
    ContactComponent,
    SupportComponent,
    HomeAdminComponent,
    SchoolListComponent,
    SchoolCreateComponent,
    SchoolEditComponent,
    UserListComponent,
    AdministrativasComponent,
    EditarComponent,
    EditUnitComponent,
    QuoteFormComponent,
    ListQuotesComponent,
    ComparativeQuotesComponent,
    EditUserComponent,
    PasswordComponent,
    EditUnitComponent,
    QuoteListProcessComponent,
    QuoteListFinalizedComponent,
    RequestQuotationComponent,
    RequestQuotationListComponent,
    RequestQuotationEditComponent,
    RequestDetailComponent,
    QuoteListComponent,
    NavUserComponent,
    HomeUserComponent,
    EditDetailQuotationComponent,
    RequestDetailRejectedComponent,
    RequestDetailQuoteComponent,
    RequestDetailApprovedComponent,
    CompanyListComponent,
    CompanyRegisterComponent,
    CompanyEditComponent,
    ItemListComponent,
    ItemRegisterComponent,
    ItemEditComponent,
    FilterPipe,
    ListBudgetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: false
    }),
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    NgxDropzoneModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
