import { RegisterUserAdministrativeComponent } from './register-user-administrative/register-user-administrative.component';
import { NgModule, Component } from '@angular/core';
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
import { AdministrativasComponent } from './administrativas/administrativas.component';
import { ListQuotesComponent } from './list-quotes/list-quotes.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditUnitComponent } from './edit-unit/edit-unit.component';
import { ComparativeQuotesComponent } from './comparative-quotes/comparative-quotes.component';
import { RequestQuotationComponent } from './request-quotation/request-quotation.component';
import { RequestQuotationListComponent } from './request-quotation-list/request-quotation-list.component';
import { RequestQuotationEditComponent } from './request-quotation-edit/request-quotation-edit.component';
import { RequestDetailComponent } from './request-detail/request-detail.component';

const routes: Routes = [
  {
    path:'',
    component: HomeAdminComponent,
    canActivate: [AuthAdminGuard]
  },
  {
    path: 'roles-list',
    component: RolesListComponent,
    canActivate: [AuthAdminGuard]
  },
  {
    path: 'roles-create',
    component: CreateRolComponent,
    canActivate: [AuthAdminGuard]
  },
  {
    path: 'roles-edit/:id',
    component: EditRolComponent,
    canActivate: [AuthAdminGuard]
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
    component: RegisterUserAdministrativeComponent,
    canActivate: [AuthAdminGuard]
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
    component: SchoolListComponent,
    canActivate: [AuthAdminGuard]
  },
  {
    path:'school-create',
    component: SchoolCreateComponent,
    canActivate: [AuthAdminGuard]
  },
  {
    path:'school-edit/:id',
    component: SchoolEditComponent,
    canActivate: [AuthAdminGuard]
  },
  {
    path:'user-list',
    component: UserListComponent,
    canActivate: [AuthAdminGuard]
  },
  {
    path:'unit-list',
    component: AdministrativasComponent
  },
  {
    path:'list-quotes',
    component: ListQuotesComponent
  },
  {
    path:'edit-user/:id',
    component: EditUserComponent
  },

  {
    path: 'comparative-quotes',
    component: ComparativeQuotesComponent
  },
  {
    path: 'unit-edit/:id',
    component: EditUnitComponent
  },
  {
    path: 'request-quotation',
    component: RequestQuotationComponent
  },
  {
    path: 'request-quotation-list',
    component: RequestQuotationListComponent
  },
  {
    path: 'request-quotation-edit',
    component: RequestQuotationEditComponent
  },
  {
    path: 'request-detail',
    component: RequestDetailComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
