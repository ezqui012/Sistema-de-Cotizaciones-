import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRolComponent } from './create-rol/create-rol.component';
import { EditRolComponent } from './edit-rol/edit-rol.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RolesListComponent } from './roles-list/roles-list.component';
import { LoginComponent } from './login/login.component';
import { InfoSiteComponent } from './info-site/info-site.component';
import { ContactComponent } from './contact/contact.component';
import { SupportComponent } from './support/support.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { SchoolListComponent } from './school-list/school-list.component';
import { SchoolCreateComponent } from './school-create/school-create.component';
import { SchoolEditComponent } from './school-edit/school-edit.component';

const routes: Routes = [
  {
    path:'',
    component: HomeAdminComponent
  },
  {
    path:'roles-list',
    component: RolesListComponent
  },
  {
    path:'roles-create',
    component: CreateRolComponent
  },
  {
    path:'roles-edit',
    component: EditRolComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'info-site',
    component: InfoSiteComponent
  },
  {
    path:'contact',
    component: ContactComponent
  },
  {
    path:'support',
    component: SupportComponent
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
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
