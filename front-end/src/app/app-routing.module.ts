import { RegisterUserAdministrativeComponent } from './register-user-administrative/register-user-administrative.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRolComponent } from './create-rol/create-rol.component';
import { EditRolComponent } from './edit-rol/edit-rol.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RolesListComponent } from './roles-list/roles-list.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: NavbarComponent
  },
  {
    path: 'roles-list',
    component: RolesListComponent
  },
  {
    path: 'roles-create',
    component: CreateRolComponent
  },
  {
    path: 'roles-edit',
    component: EditRolComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register-user',
    component: RegisterUserAdministrativeComponent

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
