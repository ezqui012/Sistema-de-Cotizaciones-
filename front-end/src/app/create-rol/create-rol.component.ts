import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router'


@Component({
  selector: 'app-create-rol',
  encapsulation:ViewEncapsulation.None,
  templateUrl: './create-rol.component.html',
  styleUrls: ['./create-rol.component.css']
})
export class CreateRolComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  //navigate
  navigateTo(path: String){
    this.router.navigate([path]);
  }

  //Angular material
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

}
