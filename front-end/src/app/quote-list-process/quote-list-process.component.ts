import { QuoteProcessService } from './../services/quote-process.service';
import { Quote } from './../Model/Quote';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonalUser } from '../Model/personalUser';
import { PersonalUserService } from '../services/PersonalUser.service';
@Component({
  selector: 'app-quote-list-process',
  templateUrl: './quote-list-process.component.html',
  styleUrls: ['./quote-list-process.component.css']
})
export class QuoteListProcessComponent implements OnInit {

  quotes: Array<Quote>=[];
  quote: Quote[] | undefined;
  business: any;
  quoteUnitecost: any;
  quantity:any
  reason: any;
  total: any;
  id_rq: any;
  quoteId: any;
  pos = 0;
  chkAproveSol:boolean = false;
  constructor(
    private modal: NgbModal,
    private router: Router,
    public _personalUserService: PersonalUserService,
    private titlePage: Title,
    public quoteProcessService:QuoteProcessService,
    private route: ActivatedRoute
  ) {
    this.titlePage.setTitle('Lista de usuarios - QUOT-UMSS');
  }

  ngOnInit(): void {
    this.business = this.route.snapshot.params.business;
    this.quoteId = this.route.snapshot.params.id;
    this.getQuoteProcess();

  }
  navigateTo(path: String){
    this.router.navigate([path]);
  }
  navigateToEdit(path: String){
    this.router.navigate([path]);
  }

  getTotalQuote(){

  }

  getQuoteProcess(){
    this.quoteProcessService.getQuoteProcess(this.quoteId).subscribe((res)=>{
    this.quotes = res
    })
  }
  deleteQuoteProcess(id:any){
    this.quoteProcessService.deleteProcess(id).subscribe(data=>{
      console.log(id)
      this.getQuoteProcess();
    })
  }



}
