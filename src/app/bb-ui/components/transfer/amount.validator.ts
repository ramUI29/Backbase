import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
function ageValidator (control: AbstractControl):{[key: string]: boolean} | null {

    if( control.value !==null && (isNaN(control.value) || control.value <-500  || control.value> 70)){
      return {'ageValidator': true}
    }
    return null;
  };