import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRolComponent } from './create-rol/create-rol.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RolesListComponent } from './roles-list/roles-list.component';


const routes: Routes = [
  {
    path:'',
    component: NavbarComponent
  },
  {
    path:'roles-list',
    component: RolesListComponent
  },
  {
    path:'roles-create',
    component: CreateRolComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
