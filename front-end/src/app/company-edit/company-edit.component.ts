import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {

  constructor(
    private router:Router,
    private fb: FormBuilder,
    public toastr: ToastrService,
    private titlePage: Title
  ) {
    this.titlePage.setTitle('Edición de Empresas - QUOT-UMSS');

  }

  ngOnInit(): void {
  }
  navigateTo(path: String){
    this.router.navigate([path]);
  }
}
