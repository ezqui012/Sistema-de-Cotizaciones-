import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterUserAdministrativeComponent } from './register-user-administrative/register-user-administrative.component';
import { LoginComponent } from './login/login.component';
import { RolesListComponent } from './roles-list/roles-list.component';
import { CreateRolComponent } from './create-rol/create-rol.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { EditRolComponent } from './edit-rol/edit-rol.component';

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
    NgbModule,
    BrowserAnimationsModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
