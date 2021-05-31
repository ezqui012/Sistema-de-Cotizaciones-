import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-item-register',
  templateUrl: './item-register.component.html',
  styleUrls: ['./item-register.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})

export class ItemRegisterComponent implements OnInit {

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]> | undefined;

  myControl2 = new FormControl();
  typeUnit: string[] = ['Cant', 'Cm', 'Ltrs'];
  filteredUnit: Observable<string[]> | undefined;

  constructor(
    private router:Router,
    private fb: FormBuilder,
    public toastr: ToastrService,
    private titlePage: Title
  ) {
    this.titlePage.setTitle('Registro de Items - QUOT-UMSS');
  }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterType(value))
    );
    this.filteredUnit = this.myControl2.valueChanges.pipe(
      startWith(''),
      map(value => this._filterUnit(value))
    );
  }

  navigateTo(path: String){
    this.router.navigate([path]);
  }

  private _filterType(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterUnit(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.typeUnit.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

}
