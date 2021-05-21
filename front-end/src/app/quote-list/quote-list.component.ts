import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.css']
})
export class QuoteListComponent implements OnInit {

  quotes:any = [{
      id_request: 1,
      id: 2,
      business_name: "Compra de muchas cosas bonitas",
      date: '2021-05-18',
      status: 'Proceso'
    },
    {
      id_request: 2,
      id: 3,
      business_name: "Compra de muchas cosas feas",
      date: '2021-05-18',
      status: 'Cotizacion'
    }
  ]

  showThis = (algo: any) => {
    alert(algo);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
