import { EditUserService } from './../../services/edit-user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UpdatePassword  } from './../../Model/registeruser';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  upPassword = new UpdatePassword;
  id: any;
  pass1: any;
  pass2: any;
  @Input() idUser:any;
  updatePassForm = this.formBuilder.group({
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32), Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)]],
    pass2: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32), Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)]]
  });
  constructor(
    public modal: NgbActiveModal,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private passwordService : EditUserService
    ){

    }

  ngOnInit(): void {
   // console.log(this.upPassword.pass1+'s');


  }

  getErrorMessagePassword(field: string) {
    let message;

    if (this.updatePassForm.get(field)?.errors?.required) {
      message = `El campo es obligatorio`;
    } else if (this.updatePassForm.get(field)?.hasError('minlength')) {
      message = "Mínimo 8 caracteres";
    } else if (this.updatePassForm.get(field)?.hasError('maxlength')) {
      message = "Máximo de 32 caracteres";
    } else if( this.updatePassForm.get(field)?.hasError('pattern')){
      message = "La contraseña debe tener al menos una letra minúscula, al menos una letra mayúscula y al menos un dígito";

    }
    return message;

  }
  saveNewPassword(){

    if(this.updatePassForm.invalid){
      return;
    }
    this.passwordService.changePassword(this.idUser, this.updatePassForm.value).subscribe(res=>{
      this.showToastSuccess();
      console.log(this.updatePassForm.get('password')?.value);
      this.modal.close();

    })
    console.log(this.id);
    //this.modal.close();
  }
  confirmPasswordMessage(field1:string, field2:string){
    let message;
    if (this.updatePassForm.get(field1)?.errors?.required) {
      message = `El campo es obligatorio`;
    }else if(this.updatePassForm.get(field2)!=this.updatePassForm.get(field1)){
      message="Las contraseñas no coinciden"
    }

    return message;
  }
  showToastSuccess(){
    this.toastr.success('Se guardaron los cambios con éxito');
  }
  isValid(field: string) {
    return (this.updatePassForm.get(field)?.touched || this.updatePassForm.get(field)?.dirty) && !this.updatePassForm.get(field)?.valid;
  }

}
