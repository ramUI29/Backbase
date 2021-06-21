import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  Renderer2,
} from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { PanelModule } from 'primeng/panel';
import { of } from 'rxjs';
import { TransactionListService } from '../../service/transaction-list.service';
import { FilterComponent } from '../filter/filter.component';
import { OrderByUpcomingToLatestPipe } from './date.pipe';

import { TansactionListComponent } from './tansaction-list.component';

describe('TansactionListComponent', () => {
  let component: TansactionListComponent;
  let fixture: ComponentFixture<TansactionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TansactionListComponent,
        OrderByUpcomingToLatestPipe,
        FilterComponent,
      ],
      imports: [
        BrowserModule,
        HttpClientModule,
        PanelModule,
        ReactiveFormsModule,
        NgScrollbarModule,
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
  it('should get undefined', fakeAsync(() => {
    const service: TransactionListService = fixture.debugElement.injector.get(
      TransactionListService
    );
    const nextSpy = spyOn(service.updatedTransaction, 'subscribe');
    component.ngOnInit();
    fixture.detectChanges();
    service.updatedTransaction.next(null);
    service.updatedTransaction.subscribe((res) => {
      expect(res).toBe(null);
    });
    expect(nextSpy).toHaveBeenCalled();
  }));
  it('should get updated data', fakeAsync(() => {
    const service: TransactionListService = fixture.debugElement.injector.get(
      TransactionListService
    );
    const nextSpy = spyOn(service.updatedTransaction, 'subscribe');
    component.ngOnInit();
    fixture.detectChanges();
    service.updatedTransaction.next([
      {
        categoryCode: '#12a580',
        dates: {
          valueDate: 1600387200000,
        },
        transaction: {
          amountCurrency: {
            amount: '82.02',
            currencyCode: 'EUR',
          },
          type: 'Card Payment',
          creditDebitIndicator: 'DBIT',
        },
        merchant: {
          name: 'The Tea Lounge',
          accountNumber: 'SI64397745065188826',
        },
      },
    ]);
    // component.currentFilter = 'The'
    service.updatedTransaction.subscribe((res) => {
      expect(res).toBeTruthy();
    });
    expect(nextSpy).toHaveBeenCalled();
  }));
  xit('should filter the transactions', fakeAsync(() => {
    spyOn(component, 'filterTransactions');
    component.filterTransactions('the');
    fixture.detectChanges();
    expect(component.filterTransactions).toBeTruthy();
  }));
  it('should call the filtetTransaction method on filter', () => {
    const fixture = TestBed.createComponent(TansactionListComponent);
    const service: TransactionListService = fixture.debugElement.injector.get(
      TransactionListService
    );
    const nextSpy = spyOn(service.updatedTransaction, 'subscribe');
    const myComponent = fixture.debugElement.query(
      By.directive(FilterComponent)
    );
    myComponent.triggerEventHandler('inputChange', 'The');
    component.ngOnInit();
    spyOn(component, 'filterTransactions');
    fixture.detectChanges();
    service.updatedTransaction.next([
      {
        categoryCode: '#12a580',
        dates: {
          valueDate: 1600387200000,
        },
        transaction: {
          amountCurrency: {
            amount: '82.02',
            currencyCode: 'EUR',
          },
          type: 'Card Payment',
          creditDebitIndicator: 'DBIT',
        },
        merchant: {
          name: 'The Tea Lounge',
          accountNumber: 'SI64397745065188826',
        },
      },
      {
        categoryCode: '#12a580',
        dates: {
          valueDate: 1600387200000,
        },
        transaction: {
          amountCurrency: {
            amount: '82.02',
            currencyCode: 'EUR',
          },
          type: 'Card Payment',
          creditDebitIndicator: 'DBIT',
        },
        merchant: {
          name: 'Lounge',
          accountNumber: 'SI64397745065188826',
        },
      },
    ]);
    service.updatedTransaction.subscribe((res) => {
      expect(res).toBeTruthy();
      expect(component.filteredData.length).toBeTruthy();
      expect(component.filterTransactions).toHaveBeenCalledWith('The');
      expect(component.filteredData.length).toBe(1);
      // expect(component.filteredData)
      //expect(component.filterTransactions).toBe();
    });
    expect(nextSpy).toHaveBeenCalled();
  });
  xit('should call the filtetTranssaction and if filter value is empty should return entire data list', () => {
    const fixture = TestBed.createComponent(TansactionListComponent);
    const service: TransactionListService = fixture.debugElement.injector.get(
      TransactionListService
    );
    const mock = [
      {
        categoryCode: '#12a580',
        dates: {
          valueDate: 1600387200000,
        },
        transaction: {
          amountCurrency: {
            amount: '82.02',
            currencyCode: 'EUR',
          },
          type: 'Card Payment',
          creditDebitIndicator: 'DBIT',
        },
        merchant: {
          name: 'The Tea Lounge',
          accountNumber: 'SI64397745065188826',
        },
      },
    ];
    const nextSpy = spyOn(service, 'getTransactionList').and.returnValues(
      of(mock)
    );
    const myComponent = fixture.debugElement.query(
      By.directive(FilterComponent)
    );
    myComponent.triggerEventHandler('inputChange', '');
    component.ngOnInit();
    spyOn(component, 'filterTransactions');
    fixture.detectChanges();
    // service.updatedTransaction.next(mock);
    service.getTransactionList().subscribe((res) => {
      expect(res).toBe(mock);
      // expect(component.filteredData).toBeTruthy();
    });
    expect(nextSpy).toHaveBeenCalled();
  });
});
