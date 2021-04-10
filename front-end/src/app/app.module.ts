import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterUserAdministrativeComponent } from './register-user-administrative/register-user-administrative.component';
import { ButtonRegisterUserAdminComponent } from './button-register-user-admin/button-register-user-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterUserAdministrativeComponent,
    ButtonRegisterUserAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
