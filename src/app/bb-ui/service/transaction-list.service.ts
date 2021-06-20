import {  HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import * as data from '../mock-data/transactions.json';


@Injectable({
  providedIn: 'root'
})
export class TransactionListService {
  
tansactionList = data;
openPopup = new Subject();
currentBalance : number;
transactions:any [];
updatedTransaction = new Subject();
  constructor(private http: HttpClient) { }
 
  /**
   * 
   * @returns using the mock data , provided endpoint('https://r9vdzv10vd.execute-api.eu-central-1.amazonaws.com/dev/transactions) giving the cors policy issue.
   */
  getTransactionList(): Observable<any>{
    // const headers = new HttpHeaders()
    // .set("Content-Type", "application/json");
    return  of(this.tansactionList);
  // return this.http.get('https://r9vdzv10vd.execute-api.eu-central-1.amazonaws.com/dev/transactions', { headers})
}
}
