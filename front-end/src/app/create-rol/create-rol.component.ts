import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {MatInputModule} from '@angular/material/input';
import {FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-create-rol',
  encapsulation:ViewEncapsulation.None,
  templateUrl: './create-rol.component.html',
  styleUrls: ['./create-rol.component.css']
})
export class CreateRolComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  //Angular material
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

}
