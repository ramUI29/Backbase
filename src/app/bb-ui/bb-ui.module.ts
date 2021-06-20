import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FilterComponent } from './components/filter/filter.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/logo/logo.component';
import { SubmitButtonComponent } from './components/submit-button/submit-button.component';
import { TransactionItemComponent } from './components/transaction-item/transaction-item.component';
import { TransferComponent } from './components/transfer/transfer.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RippleModule } from 'primeng/ripple';
import { FormsModule } from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { TansactionListComponent } from './components/tansaction-list/tansaction-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { OrderByUpcomingToLatestPipe } from './components/tansaction-list/date.pipe';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';
const COMPONENTS = [
  FooterComponent,
  LogoComponent,
  SubmitButtonComponent,
  FilterComponent,
  TransactionItemComponent,
  TransferComponent,
  TansactionListComponent,
  OrderByUpcomingToLatestPipe,
  ConfirmationComponent,
];
@NgModule({
  declarations: COMPONENTS,
  imports: [
    HttpClientModule,
    InputTextModule,
    CheckboxModule,
    ReactiveFormsModule,
    ButtonModule,
    RadioButtonModule,
    RippleModule,
    PanelModule,
    FormsModule,
    CommonModule,
    NgScrollbarModule,
    ConfirmDialogModule,
    DialogModule,
  ],
  exports: COMPONENTS,
  providers: [ConfirmationService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BbUIModule {}
