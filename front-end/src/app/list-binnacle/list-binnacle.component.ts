import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from "ngx-spinner";
import { BinnacleService } from '../services/binnacle.service';
import { NgbModal, NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-binnacle',
  templateUrl: './list-binnacle.component.html',
  styleUrls: ['./list-binnacle.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  providers: [NgbPopoverConfig]
})
export class ListBinnacleComponent implements OnInit {

  //listBinnacle: Array<any> = [];
  listBinnacle: any;

  pos: any;
  showOld: boolean = false;

  newInfo: any;
  oldInfo: any;

  spinnerType: string | any;
  spinnerName: string | any;

  constructor(
    private modal: NgbModal,
    private service: BinnacleService,
    public config: NgbPopoverConfig,
    private titlePage: Title,
    private spinner: NgxSpinnerService,
    public toastr: ToastrService
  ) {
    this.titlePage.setTitle('Bitacoras - QUOT-UMSS');
    config.placement = 'left';
    config.triggers = 'hover';
    this.spinnerName = 'sp3';
    this.spinnerType = 'ball-spin-clockwise';
  }

  ngOnInit(): void {
    this.spinner.show(this.spinnerName);
    this.listAllBinnacle();
  }

  listAllBinnacle(){
    this.service.listBinnacle().subscribe(
      (data) => {
        this.listBinnacle = data;
        this.spinner.hide(this.spinnerName);
      },
      (error) => {
        this.spinner.hide(this.spinnerName);
        this.toastr.error(`ERROR: ${error} Recargue la pagina`);
      }
    );
  }

  openModal(content: any, pos:any){
    this.pos = pos;
    let aux1 = this.listBinnacle[pos].new_data;
    aux1 = aux1.replace(/"/g, '');
    aux1 = aux1.replace(/}/g, '');
    aux1 = aux1.replace(/{/g, '');
    this.newInfo = aux1.split(',');
    let aux2 = this.listBinnacle[pos].old_data;
    if(aux2 === null){
      this.showOld = false;
    }else{
      this.showOld = true;
      aux2 = aux2.replace(/"/g, '');
      aux2 = aux2.replace(/}/g, '');
      aux2 = aux2.replace(/{/g, '');
      this.oldInfo = aux2.split(',');
    }
    this.modal.open(content,{ windowClass:"colorModal"});
  }
}
