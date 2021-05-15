import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AssignedPermit, RegisterAssignedPermitResponse } from '../Model/assignedPermit';
import { PermitService } from '../services/permit.service';
import { RolesService } from '../services/roles.service';
import { AssignedPermitService } from '../services/assignedPermit.service';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-edit-rol',
  encapsulation:ViewEncapsulation.Emulated,

  templateUrl: './edit-rol.component.html',
  styleUrls: ['./edit-rol.component.css']
})
export class EditRolComponent implements OnInit {


  id:any;

  private pattern_name = /^[a-zA-Z-zñÑ\u00E0-\u00FC ]*$/
  public role:any;

  registerForm = this.fb.group({
    //id_permit: ['', [Validators.required]],
    name_role: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(75), Validators.pattern(this.pattern_name)]],
    description_role: ['', [Validators.required, Validators.minLength(15), Validators.maxLength(100)]],
    checkAproveSol: [false],
    checkCreateCot: [false],
    checkCreateSol: [false],
    checkEditCot: [false],
    checkEditSol: [false],
    checkRegisterEmp: [false],
    checkItemGasto: [false],
    checkListSol: [false]

  });
  constructor(private router:Router,

    public _roleService: RolesService,
    public _permitService: PermitService,
    public _assignedPermit: AssignedPermitService,
    private fb: FormBuilder,
    public toastr: ToastrService,
    private route: ActivatedRoute,
    private titlePage: Title) {
      this.titlePage.setTitle('Edición de roles - QUOT-UMSS');
    }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log("recupere el id: "+this.id);
   // var unidad:ListUnit =
    //this.getRole(this.id);
  }
  navigateTo(path: String){
    this.router.navigate([path]);
  }


  /*getRole(id:any){
    this.serviceUnitSelect.getUnitSelect(id).subscribe((data) => {
      console.log(data);

      this.role = data;

      this.setRoleData();


      },
      (error:any) => {
        console.log(`Error: ${error}`);
        this.toastr.error(`Error: ${error}. Recargue la página`);
      }
    );
  }*/

}
