import { UnitService } from './../services/unit.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {

    units: any = [];
  constructor(public unitService: UnitService) { }

  getUnits(){
    this.unitService.getUnits().subscribe((unit) => {
      console.log(unit);
      return this.units = unit;
    });
  }

  ngOnInit(): void {
    this.getUnits();

  }

}
