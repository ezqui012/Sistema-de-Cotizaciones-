import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-quote-form',
  templateUrl: './quote-form.component.html',
  styleUrls: ['./quote-form.component.css'],
  encapsulation:ViewEncapsulation.Emulated
})
export class QuoteFormComponent implements OnInit {

  findControl = new FormControl();
  options: string[] = ['Tigo', 'Muebles rr', 'Mundo Tecno', 'Viva', 'Pollos de la case'];
  filteredOptions: Observable<string[]> | undefined;

  items: string[] = ['Monitores', 'Sillas'];

  constructor() { }

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

}
