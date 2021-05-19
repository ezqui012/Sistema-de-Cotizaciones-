import { NgModule } from '@angular/core';
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
import { QuoteFormComponent } from './quote-form/quote-form.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RequestQuotationComponent } from './request-quotation/request-quotation.component';
import { RequestQuotationListComponent } from './request-quotation-list/request-quotation-list.component';
import { RequestQuotationEditComponent } from './request-quotation-edit/request-quotation-edit.component';
import { RequestDetailComponent } from './request-detail/request-detail.component';

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
    RequestQuotationComponent,
    RequestQuotationListComponent,
    RequestQuotationEditComponent,
    RequestDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
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
    MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
