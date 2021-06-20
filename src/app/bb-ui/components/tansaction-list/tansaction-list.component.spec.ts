import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Renderer2 } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { PanelModule } from 'primeng/panel';
import { TransactionListService } from '../../service/transaction-list.service';
import { OrderByUpcomingToLatestPipe } from './date.pipe';

import { TansactionListComponent } from './tansaction-list.component';

describe('TansactionListComponent', () => {
  let component: TansactionListComponent;
  let fixture: ComponentFixture<TansactionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TansactionListComponent, OrderByUpcomingToLatestPipe],
      imports: [BrowserModule, HttpClientModule,PanelModule, ReactiveFormsModule, NgScrollbarModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [TransactionListService, HttpClientModule, HttpClient],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TansactionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should get undefined', fakeAsync(()=>{
    const service: TransactionListService = fixture.debugElement.injector.get(TransactionListService);
    const nextSpy = spyOn(service.updatedTransaction, 'subscribe');
    component.ngOnInit();
    fixture.detectChanges();
    service.updatedTransaction.next(null);
    service.updatedTransaction.subscribe(res=>{
      expect(res).toBe(null);
    })
    expect(nextSpy).toHaveBeenCalled();
  }))
  it('should get updated data', fakeAsync(()=>{
    const service: TransactionListService = fixture.debugElement.injector.get(TransactionListService);
    const nextSpy = spyOn(service.updatedTransaction, 'subscribe');
    component.ngOnInit();
    fixture.detectChanges();
    service.updatedTransaction.next([{
      "categoryCode": "#12a580",
      "dates": {
        "valueDate": 1600387200000
      },
      "transaction": {
        "amountCurrency": {
          "amount": "82.02",
          "currencyCode": "EUR"
        },
        "type": "Card Payment",
        "creditDebitIndicator": "DBIT"
      },
      "merchant": {
        "name": "The Tea Lounge",
        "accountNumber": "SI64397745065188826"
      }
    }]);
     // component.currentFilter = 'The'
      service.updatedTransaction.subscribe(res=>{
      expect(res).toBeTruthy();
    })
    expect(nextSpy).toHaveBeenCalled();
  }))
  xit('should filter the transactions', fakeAsync(()=>{
    spyOn(component, 'filterTransactions');
    component.filterTransactions('the');
    fixture.detectChanges();
    expect(component.filterTransactions).toBeTruthy();
  }))
});
