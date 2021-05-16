import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-quote-form',
  templateUrl: './quote-form.component.html',
  styleUrls: ['./quote-form.component.css'],
  encapsulation:ViewEncapsulation.Emulated
})
export class QuoteFormComponent implements OnInit {

  /* Razon social estatica */
  business_name:string = 'Actualizacion de monitores del laboratorio';

  findControl = new FormControl();
  options: string[] = ['Tigo', 'Muebles rr', 'Mundo Tecno', 'Viva', 'Pollos de la case'];
  filteredOptions: Observable<string[]> | undefined;

  items: string[] = ['Monitores', 'Sillas'];

  registerForm = this.fb.group({
    id_enterprise: ['', [Validators.required]],
    id_item: ['', [Validators.required]],
    id_quotation: ['', [Validators.required]],
    quantity: ['', [Validators.required]],
    unit_cost: ['', [Validators.required]],
    date:['', [Validators.required]],
    delivery_days: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    public toastr: ToastrService,
    private router:Router,
    private titlePage: Title
  ) {
    this.titlePage.setTitle('Formulario de cotización - QUOT-UMSS');
  }

  ngOnInit(): void {
    this.filteredOptions = this.findControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  showValue(){
    console.log(this.registerForm.value);
  }

}
