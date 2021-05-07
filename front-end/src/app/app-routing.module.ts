import { RegisterUserAdministrativeComponent } from './register-user-administrative/register-user-administrative.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRolComponent } from './create-rol/create-rol.component';
import { EditRolComponent } from './edit-rol/edit-rol.component';
import { RolesListComponent } from './roles-list/roles-list.component';
import { LoginComponent } from './login/login.component';
import { UnitsRegisterComponent } from './units-register/units-register.component';
import { InfoSiteComponent } from './info-site/info-site.component';
import { ContactComponent } from './contact/contact.component';
import { SupportComponent } from './support/support.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { SchoolListComponent } from './school-list/school-list.component';
import { SchoolCreateComponent } from './school-create/school-create.component';
import { SchoolEditComponent } from './school-edit/school-edit.component';
import { PersonalUser } from './Model/personalUser';
import { UserListComponent } from './user-list/user-list.component';

import { AuthAdminGuard } from './guards/auth-admin.guard';
import { AuthLoginGuard } from './guards/auth-login.guard';

const routes: Routes = [
  {
    path:'',
    component: HomeAdminComponent
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
    component: LoginComponent,
    canActivate: [AuthLoginGuard]
  },
  {
    path: 'units-register',
    component: UnitsRegisterComponent,
    canActivate: [AuthAdminGuard]
  },
  {
    path: 'register-user',
    component: RegisterUserAdministrativeComponent
  },
  {
    path:'info-site',
    component: InfoSiteComponent,
    canActivate: [AuthLoginGuard]
  },
  {
    path:'contact',
    component: ContactComponent,
    canActivate: [AuthLoginGuard]
  },
  {
    path:'support',
    component: SupportComponent,
    canActivate: [AuthLoginGuard]
  },
  {
    path:'school-list',
    component: SchoolListComponent
  },
  {
    path:'school-create',
    component: SchoolCreateComponent
  },
  {
    path:'school-edit',
    component: SchoolEditComponent
  },
  {
    path:'user-list',
    component: UserListComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
