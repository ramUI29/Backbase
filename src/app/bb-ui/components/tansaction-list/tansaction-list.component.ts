import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { TransactionListService } from '../../service/transaction-list.service';
@Component({
  selector: 'app-tansaction-list',
  templateUrl: './tansaction-list.component.html',
  styleUrls: ['./tansaction-list.component.scss'],
})
export class TansactionListComponent implements OnInit {
  listOfTransactions:any;
  filteredData = [];
  currentFilter: any;
  constructor(
    private transactionList: TransactionListService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.listOfTransactions = this.transactionList.transactions.slice();
    this.filteredData = this.listOfTransactions.slice();
    this.transactionList.updatedTransaction.subscribe((res) => {
      if(res){
      this.listOfTransactions = res;
      this.filteredData = this.listOfTransactions.slice();
      if(this.currentFilter){
        this.filterTransactions(this.currentFilter);
      }
      }
    });
 

  }
  ngAfterViewInit() {
    this.elementRef.nativeElement
      .querySelector('input')
      .addEventListener('keydown', (event) => {
        if (event.keyCode == 8 || event.keyCode == 46)
          this.filteredData = this.listOfTransactions.slice();
      });
  }
  filterTransactions(val) {
    val = val.toUpperCase();
    if (!val) {
      this.filteredData = this.listOfTransactions.slice();
    } else if (val) {
      this.currentFilter = val;
      this.filteredData = this.filteredData.filter((item) => {
        const filterVal = item.merchant.name.toUpperCase();
        return filterVal.indexOf(val) > -1;
      });
    }
  }
}
