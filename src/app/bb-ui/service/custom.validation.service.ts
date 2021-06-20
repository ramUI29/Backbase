import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { TransactionListService } from './transaction-list.service';

@Injectable({
  providedIn: 'root'
})
export class CustomvalidationService {
    constructor( private transactionList: TransactionListService,){

    }

  transferAmount(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
    // const regex = new RegExp('^[0-9]+(.[0-9]{1,2})?$');
    const highTransfer = control.value < (this.transactionList.currentBalance + 500)
    if (highTransfer ) {
       return null;
      }
      return  {'highamount': 'true'}
    };
  }
}