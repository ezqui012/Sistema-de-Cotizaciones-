import { AbstractControl } from '@angular/forms';

export class ValidationAmount {

  static isVisible(visible: boolean){
    return (control: AbstractControl) => {
      const value = control.value;
      if(visible && value===null){
        return {isVisible: true}
      }
      return null;
    };
  }

}
