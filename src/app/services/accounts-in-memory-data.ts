import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';

import {
  IAccount,
  IGetAccountsReq,
  IOrderingConfig,
  IAccountsInMemoryDataServiceConfig,
  IPaginationConfig,
  IGetAccountsWithPaginationRes,
} from './accounts-in-memory-data.interface';

/**
 * Provides mocking of HTTP responses with mocked data. Provides pagination and sorting logic.
 */
@Injectable({
  providedIn: 'root',
})
export class AccountsInMemoryDataService implements HttpInterceptor {
  private accounts: IAccount[] = [
    {
      id: '0029',
      name: 'AAA',
      amount: 39160336.42,
      prevAmount: 39191770.29,
      currency: 'USD',
    },
    {
      id: '0146',
      name: 'IRA',
      amount: 15884302.39,
      prevAmount: 15876871.56,
      currency: 'USD',
    },
    {
      id: '1812',
      name: 'AAA',
      amount: 2010926.1,
      prevAmount: 1972044.47,
      currency: 'USD',
    },
    {
      id: '2019',
      name: 'REG',
      amount: 13465679.34,
      prevAmount: 13465679.34,
      currency: 'USD',
    },
    {
      id: '3810',
      name: 'AAA',
      amount: 10050054.07,
      prevAmount: 10041137.38,
      currency: 'USD',
    },
    {
      id: '5200',
      name: 'IRA',
      amount: 5763.36,
      prevAmount: 14680.05,
      currency: 'USD',
    },
    {
      id: '5780',
      name: 'AAA',
      amount: 10050054.07,
      prevAmount: 10041137.38,
      currency: 'USD',
    },
    {
      id: '6200',
      name: 'IRA',
      amount: 5763.36,
      prevAmount: 14680.05,
      currency: 'USD',
    },
  ];

  config: IAccountsInMemoryDataServiceConfig = {
    limit: 3,
    offset: 0,
    orderBy: 'id',
    order: 'asc',
  };

  /**
   * Returns first object satisfying the search term
   */
  private getAccountDetails = (searchTerm: string, value: any) => {
    for (let i = 0; i < this.accounts.length; ++i) {
      if (this.accounts[i][searchTerm] === value) return this.accounts[i];
    }
    return null;
  };

  private getOrderedAccounts = ({
    orderBy = this.config.orderBy,
    order = this.config.order,
  }: IOrderingConfig): IAccount[] => {
    return this.accounts.sort((currAccount, nextAccount) => {
      let result = 0;
      if (typeof currAccount[orderBy] === 'number') {
        result =
          (currAccount[orderBy] as number) - (nextAccount[orderBy] as number);
      }
      if (typeof currAccount[orderBy] === 'string') {
        result = (currAccount[orderBy] as string).localeCompare(
          nextAccount[orderBy] as string
        );
      }
      return order === 'asc' ? result : -result;
    });
  };

  private applyPagination = (
    accounts: IAccount[],
    {
      limit = this.config.limit,
      offset = this.config.offset,
    }: IPaginationConfig
  ): IGetAccountsWithPaginationRes => {
    const total = accounts.length;
    const count = total - offset > 0 ? (offset + limit > total) ? total - offset : limit : 0;
    const records = count > 0 ? accounts.slice(offset, offset + limit) : [];
    return {
      total,
      count,
      records,
    };
  };

  intercept(
    request: HttpRequest<IGetAccountsReq>,
    next: HttpHandler
  ): Observable<HttpEvent<IGetAccountsWithPaginationRes>> {
    const { url, method, params } = request;
    switch (url) {
      case 'api/accounts': {
        switch (method) {
          case 'GET': {
            const paramsObj = {};
            if (params.has('orderBy'))
              paramsObj['orderBy'] = params.get('orderBy');
            if (params.has('order')) paramsObj['order'] = params.get('order');
            if (params.has('limit')) paramsObj['limit'] = params.get('limit');
            if (params.has('offset'))
              paramsObj['offset'] = params.get('offset');
            const body = this.applyPagination(
              this.getOrderedAccounts({ ...paramsObj }),
              { ...paramsObj }
            );
            const response = new HttpResponse({
              status: 200,
              body,
            });
            return of(response);
          }
        }
      }
    }
  }
}
