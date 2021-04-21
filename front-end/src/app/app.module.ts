import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterUserAdministrativeComponent } from './register-user-administrative/register-user-administrative.component';
import { ButtonRegisterUserAdminComponent } from './button-register-user-admin/button-register-user-admin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';



import { LoginComponent } from './login/login.component';
import { RolesListComponent } from './roles-list/roles-list.component';
import { CreateRolComponent } from './create-rol/create-rol.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { EditRolComponent } from './edit-rol/edit-rol.component';
const appRoutes: Routes = [
  {path: '', component: RegisterUserAdministrativeComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    RegisterUserAdministrativeComponent,
    LoginComponent,
    RolesListComponent,
    CreateRolComponent,
    NavbarComponent,
    EditRolComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
