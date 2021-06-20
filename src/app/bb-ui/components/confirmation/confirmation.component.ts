import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TransactionListService } from '../../service/transaction-list.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent implements OnInit {
  @Input() account: string;
  @Input() amount: string;
  displayBasic: boolean;
  display: boolean;
  @Output() confirmation: EventEmitter<any> = new EventEmitter();
  constructor(private popup: TransactionListService) {}

  ngOnInit(): void {
    this.popup.openPopup.subscribe((res) => {
      if (res) {
        this.display = true;
      }
    });
  }
  sendTransfer() {
    this.confirmation.emit(true);
    this.display = false;
  }
  cancelTransfer() {
    this.confirmation.emit(false);
    this.display = false;
  }
}
