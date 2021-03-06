import { Component, OnInit } from '@angular/core';
import { TransactionListService } from '../../service/transaction-list.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CustomvalidationService } from '../../service/custom.validation.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
})
export class TransferComponent implements OnInit {
  listOfTransactions: any[];
  currentAmount: number;
  displayModal: boolean;
  debitedAmount: number = 0;
  totalAmountLeft: number;
  transferAmount: string;
  accountName: string;
  form: FormGroup;
  maxamount: number;
  submitted: boolean;
  insufficientFunds: boolean;
  constructor(
    private transactionList: TransactionListService,
    fb: FormBuilder,
    validation: CustomvalidationService
  ) {
    this.form = fb.group({
      accountName: ['', Validators.required],
      transferAmount: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]+(.[0-9]{1,2})?$'),
          validation.transferAmount(),
        ],
      ],
    });
  }

  ngOnInit(): void {
    /**
     * provided AWS endpoint  giving the cors policy issue
     * getting the list of transactions from ransactionList service using avilable mockdata
     */
    this.transactionList.getTransactionList().subscribe((res) => {
      this.listOfTransactions = [...res.data];
    });
    this.transactionList.updatedTransaction.next(this.listOfTransactions);
    this.transactionList.transactions = this.listOfTransactions.slice();
    this.getcurrentBalance();
  }

  /**
   *
   * @returns confirm method is for submitting the transfer form.
   *
   */
  confirm(event) {
    const availableAmount = this.totalAmountLeft;
    /**
     * utilized mock object to update the tansactions list upon successfull transfer.
     */
    let transferObj = {
      categoryCode: '#12a590',
      dates: {
        valueDate: Date.now(),
      },
      transaction: {
        amountCurrency: {
          amount: `${this.form.controls['transferAmount'].value}`,
          currencyCode: 'EUR',
        },
        type: 'Salaries',
        creditDebitIndicator: 'DBIT',
      },
      merchant: {
        name: this.form.controls['accountName'].value,
        accountNumber: 'SI64397745065188826',
      },
    };
    this.listOfTransactions.push(transferObj);
    if (this.getcurrentBalance() < -500) {
      this.totalAmountLeft = availableAmount;
      this.transactionList.currentBalance = availableAmount;
      this.listOfTransactions.pop();
      return;
    }
    if (this.form.status === 'INVALID' || this.form.untouched) {
      this.submitted = true;
      return;
    } else {
      this.displayModal = true;
      this.transactionList.openPopup.next(this.displayModal);
    }
  }
  /**
   *
   * @returns below methos return the total avilable balance left on the user account
   * utilized mock data CRDT - DBIT  transactions to find the total available balance
   * upon each transaction available balance will get update.
   */
  getcurrentBalance() {
    this.debitedAmount = 0;
    this.currentAmount = 0;
    this.totalAmountLeft = 0;
    for (let i = 0; i <= this.listOfTransactions.length - 1; i++) {
      if (
        this.listOfTransactions[i].transaction.creditDebitIndicator === 'CRDT'
      ) {
        this.currentAmount =
          this.listOfTransactions[i].transaction.amountCurrency.amount;
      } else {
        this.debitedAmount =
          this.debitedAmount +
          +this.listOfTransactions[i].transaction.amountCurrency.amount;
        this.debitedAmount = Math.floor(this.debitedAmount * 100) / 100;
      }
    }
    this.totalAmountLeft = this.currentAmount - this.debitedAmount;
    this.transactionList.currentBalance = this.totalAmountLeft;
    return this.totalAmountLeft;
  }

  /**
   *
   * @param  based on user action on connfirmation pop up will make or cancel the transfer
   * @returns  form will reset will if transfer is done.
   */
  doTransfer(event) {
    if (event) {
      this.transactionList.updatedTransaction.next(this.listOfTransactions);
      this.form.reset();
    } else {
      this.listOfTransactions.pop();
      this.getcurrentBalance();
      return;
    }
  }
}
