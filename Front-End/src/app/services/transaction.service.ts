import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private baseUrl = environment.url + 'api/transactions';

  constructor(private http: HttpClient) { }

  getAllTransactions(page : number, size : number): Observable<Transaction[]> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Transaction[]>(this.baseUrl , { params: params } ) ;
  }

  getTransactionById(transactionId: number): Observable<Transaction> {
    return this.http.get<Transaction>(this.baseUrl +`/${transactionId}`);
  }
  getTransactionCountForLastThreeMonths(): Observable<any> {
    return this.http.get<any>(this.baseUrl +`/six-last-months`);
  }
  updateTransaction(transactionId: number, transaction: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(this.baseUrl + `/${transactionId}`, transaction);
  }

  deleteTransactionsByIds(ids: number[]): Observable<any> {
    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: ids
    };
    return this.http.delete<any>(this.baseUrl, options);
  }
}
