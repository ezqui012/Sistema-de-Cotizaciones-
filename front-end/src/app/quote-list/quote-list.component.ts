import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { QuotationService } from '../services/quotation.service';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { ListAssignedQuotes } from '../Model/quotation';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.css'],
  encapsulation:ViewEncapsulation.Emulated
})
export class QuoteListComponent implements OnInit {

  quotes: ListAssignedQuotes | any;

  showThis = (algo: any) => {
    alert(algo);
  }

  constructor(
    private services:QuotationService,
    private router:Router,
    private titlePage: Title,
    private route: ActivatedRoute,
    public toastr: ToastrService
  ) {
    this.titlePage.setTitle('Lista de cotizaciones asignadas - QUOT-UMSS')
  }

  ngOnInit(): void {
    //pasar id del usuario
    this.getList(2);
  }

  getList(id: any){
    this.services.getListQuotes(id).subscribe(
      (data) => {
        this.quotes = data;
      },
      (error) => {
        console.log(error);
        this.toastr.error('Ocurrio un error al cargar la pagina, intente nuevamente');
      }
    );
  }

  navigateTo(path: String){
    this.router.navigate([path]);
  }

}
