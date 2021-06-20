import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PanelModule } from 'primeng/panel';
import { of } from 'rxjs';
import { TransactionListService } from '../../service/transaction-list.service';

import { ConfirmationComponent } from './confirmation.component';

describe('ConfirmationComponent', () => {
  let component: ConfirmationComponent;
  let service: TransactionListService;
  let fixture: ComponentFixture<ConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationComponent ],
      imports : [BrowserModule,HttpClientModule,BrowserAnimationsModule,PanelModule,ReactiveFormsModule],
      providers:[TransactionListService, HttpClient],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should get the accountName value', ()=>{
    component.account = 'test';
    component.amount = '30'
    fixture.detectChanges();
    const bannerDe: DebugElement = fixture.debugElement;
    const accountName = bannerDe.query(By.css('#accountName'));
    const p: HTMLElement = accountName.nativeElement;
    expect(p.textContent.toLowerCase().trim()).toEqual('test');
    const amount = bannerDe.query(By.css('#amount'));

  })
  it('should get the amount value', ()=>{
    component.amount = '30'
    fixture.detectChanges();
    const bannerDe: DebugElement = fixture.debugElement;
    const amount = bannerDe.query(By.css('#amount'));
    const p: HTMLElement = amount.nativeElement;
    expect(p.textContent.trim()).toEqual('€ 30');
  })
  it('should get the confirmation about popup', fakeAsync(()=>{
    const service: TransactionListService = fixture.debugElement.injector.get(TransactionListService);
    const nextSpy = spyOn(service.openPopup, 'subscribe');
    component.ngOnInit();
    fixture.detectChanges();
    component.ngOnInit();
    service.openPopup.next(true);
    service.openPopup.subscribe(res=>{
      expect(res).toBe(true);
    })
    expect(component.display).toBe(true);
    expect(nextSpy).toHaveBeenCalled();
  }));
  it('should emit the value true onclick of sendTransfer', ()=>{
    spyOn(component.confirmation, 'emit');
    component.sendTransfer();
    expect(component.confirmation.emit).toHaveBeenCalled();
    expect(component.display).toBe(false);

  });
  it('should emit the value true onclose of cancel', ()=>{
    spyOn(component.confirmation, 'emit');
    component.cancelTransfer();
    expect(component.confirmation.emit).toHaveBeenCalled();
    expect(component.display).toBe(false);
  });
});
