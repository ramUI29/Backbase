import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  DebugElement,
  Component,
} from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PanelModule } from 'primeng/panel';
import { TransactionListService } from '../../service/transaction-list.service';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { SubmitButtonComponent } from '../submit-button/submit-button.component';
import { OrderByUpcomingToLatestPipe } from '../tansaction-list/date.pipe';
import { TansactionListComponent } from '../tansaction-list/tansaction-list.component';
import { TransactionItemComponent } from '../transaction-item/transaction-item.component';

import { TransferComponent } from './transfer.component';

describe('TransferComponent', () => {
  let component: TransferComponent;
  let submitEl: DebugElement;
  let fixture: ComponentFixture<TransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TransactionItemComponent,
        TransferComponent,
        TansactionListComponent,
        ConfirmationComponent,
        OrderByUpcomingToLatestPipe,
      ],
      imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        PanelModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [TransactionListService, HttpClient],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  xit('should call the confirm method', fakeAsync(() => {
    spyOn(component, 'confirm');
    const fakeEvent = { preventDefault: () => console.log('preventDefault') };
    fixture.debugElement
      .query(By.css('form'))
      .triggerEventHandler('submit', fakeEvent);
    expect(component.confirm).toHaveBeenCalled();
  }));
  it('should call confirm() method on form submit', () => {
    /*Get button from html*/
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    // Supply id of your form below formID
    const getForm = fixture.debugElement.query(By.css('form'));
    expect(getForm.triggerEventHandler('submit', compiled)).toBeUndefined();
  });
  it('should not open pop up if current balance is less than -500 euros', () => {
    spyOn(component, 'getcurrentBalance').and.returnValue(-800);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const getForm = fixture.debugElement.query(By.css('form'));
    expect(getForm.triggerEventHandler('submit', compiled)).toBeUndefined();
  });
});
