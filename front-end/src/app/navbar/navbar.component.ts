import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutResponse } from '../Model/login';
import { LoginService } from '../services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router:Router,
    private service: LoginService,
    public toastr: ToastrService
  ) { }

  navigateTo(path: String){
    this.router.navigate([path]);
  }
  show: boolean = false;
  ngOnInit(): void {
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
        this.router.navigate(['/login']);
      },
      (error: any) => {
        console.log(`Error: ${error.message}`);
        this.toastr.error(`Se produjo un error ${error} intente de nuevo`);
      }
    );
  }

}
