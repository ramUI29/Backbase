import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { Observable } from 'rxjs';

import { TransactionListService } from './transaction-list.service';

describe('TransactionListService', () => {
  let service: TransactionListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [BrowserModule,HttpClientModule],

    });
    service = TestBed.inject(TransactionListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return provided data',()=>{
    // expect(service.getTransactionList()).toBe
    service.tansactionList = {data: [{
      categoryCode: '#12a590',
      dates: {
        valueDate: Date.now(),
      },
      transaction: {
        amountCurrency: {
          amount: 200,
          currencyCode: 'EUR',
        },
        type: 'Salaries',
        creditDebitIndicator: 'DBIT',
      },
      merchant: {
        name: 'test',
        accountNumber: 'SI64397745065188826',
      },
    }]}
     service.getTransactionList().subscribe(res=>{
       expect(res).toBeTruthy();
       expect(res.data.length).toEqual(1);
     })
  })
  it('should Retun undefined',()=>{
    service.tansactionList = undefined
     service.getTransactionList().subscribe(res=>{
       expect(res).toBe(undefined);
     })
  })

});
