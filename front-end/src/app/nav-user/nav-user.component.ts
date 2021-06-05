import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutResponse } from '../Model/login';
import { LoginService } from '../services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav-user',
  templateUrl: './nav-user.component.html',
  styleUrls: ['./nav-user.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class NavUserComponent implements OnInit {

  show: boolean = false;

  showQuote: boolean = false;
  showRequest: boolean = false;
  showAccept: boolean = false;
  showItem: boolean = false;
  showEnterprise: boolean = false;

  permission: number[] | any;

  constructor(
    private router:Router,
    private service: LoginService,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.permission = JSON.parse("[" + localStorage.getItem('quot-umss-pa') + "]");
    this.hasAccess();
  }

  navigateTo(path: String){
    this.router.navigate([path]);
  }

  logout(){
    let res: LogoutResponse;
    this.service.logout().subscribe(
      (data) => {
        res = data;
        localStorage.removeItem('quot-umss-tk');
        localStorage.removeItem('quot-user');
        localStorage.removeItem('quot-umss-p');
        localStorage.removeItem('quot-umss-u');
        localStorage.removeItem('quot-umss-pa');
        localStorage.removeItem('quot-umss-f');
        localStorage.removeItem('quot-umss-usr');
        this.router.navigate(['/login']);
      },
      (error: any) => {
        console.log(`Error: ${error.message}`);
        this.toastr.error(`Se produjo un error ${error} intente de nuevo`);
      }
    );
  }

  hasAccess(){
    if(this.permission.includes(1) &&  this.permission.includes(2)){
      this.showQuote = true;
    }
    if(this.permission.includes(4)  &&  this.permission.includes(5) &&  this.permission.includes(6)){
      this.showRequest = true;
    }
    if(this.permission.includes(3)){
      this.showAccept = true;
    }
    if(this.permission.includes(7)){
      this.showItem = true;
    }
    if(this.permission.includes(8)){
      this.showEnterprise = true;
    }
  }

}
