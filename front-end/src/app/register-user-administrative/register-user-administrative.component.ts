import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-user-administrative',
  templateUrl: './register-user-administrative.component.html',
  styleUrls: ['./register-user-administrative.component.css']
})
export class RegisterUserAdministrativeComponent implements OnInit {
  nameUserAd: string ="Departamento de ingenieria ambiental";
  faculty: string;
  TypeofUserAd: string;
  sayHello(){
    alert('Hi dud');
  }
  constructor() {
    this.faculty="Tecnology";
    this.TypeofUserAd="Administrative Unity"


  }

  ngOnInit(): void {
  }

}
