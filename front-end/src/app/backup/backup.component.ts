import { BackupService } from './../services/backup.service';
import { Backup } from './../Model/backup';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-backup',
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.css']
})
export class BackupComponent implements OnInit {
  backup: Array<Backup>=[];
  pos = 0;
  spinnerType: string | any;
  spinnerName: string | any;
  constructor( private router: Router,
    private backup_service:BackupService,
    public toastr: ToastrService,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit(): void {
    this.spinner.show(this.spinnerName);
    this.getBackup();

  }
  getBackup(){
    this.backup_service.listCompany().subscribe(backups=>{
      this.spinner.hide(this.spinnerName);
      return this.backup= backups
    })
  }
  showToastSuccess() {
    this.toastr.success('Se restauró el backup exitosamente');
  }
  restoreBackup(path:any){
    console.log(path+3);
    let route={

      routePath: path
    }
    this.backup_service.restoreBD(route).subscribe(res=>{
      if(res.res){ this.showToastSuccess();}

    },(error)=>{
      this.toastr.error("Error");
    })
  }

}
