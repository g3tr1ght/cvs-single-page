import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {
  IGetAccountsWithPaginationRes,
  IGetAccountsReq,
} from './accounts-in-memory-data.interface';

@Injectable({ providedIn: 'root' })
export class AccountsService {
  private accountsUrl = 'api/accounts';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getAccounts(
    params: IGetAccountsReq
  ): Observable<IGetAccountsWithPaginationRes> {
    return this.http
      .get<IGetAccountsWithPaginationRes>(this.accountsUrl, {
        ...this.httpOptions,
        observe: 'body',
        params: params as { [param: string]: string | string[] },
      })
      .pipe(
        catchError(
          this.handleError<IGetAccountsWithPaginationRes>('getAccounts')
        )
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
