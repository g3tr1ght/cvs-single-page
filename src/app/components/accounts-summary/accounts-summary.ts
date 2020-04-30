import { Component, OnInit } from '@angular/core';
import {
  IAccount,
  IPaginationConfig,
  IOrderingConfig,
  IAccountsOrderTerm,
} from 'src/app/services/accounts-in-memory-data.interface';
import { AccountsService } from 'src/app/services/accounts';

@Component({
  selector: 'accounts-summary',
  templateUrl: './accounts-summary.html',
  styleUrls: ['./accounts-summary.scss'],
})
export class AccountsSummaryComponent implements OnInit {
  accounts: IAccount[] = [];
  canLoadMore: boolean = true;
  private pagination: IPaginationConfig = {
    offset: 0,
    limit: 3,
  };
  order: IOrderingConfig = {
    orderBy: 'id',
    order: 'asc',
  };

  constructor(private accountsService: AccountsService) {}

  ngOnInit() {
    this.getAccounts();
  }

  orderBy(term: IAccountsOrderTerm) {
    if (term === this.order.orderBy) {
      this.order.order = this.order.order === 'asc' ? 'desc' : 'asc';
    } else {
      this.order.order = 'asc';
      this.order.orderBy = term;
    }
    const pagination: IPaginationConfig = {
      offset: 0,
      limit: this.accounts.length,
    };
    this.getAccounts(pagination);
  }

  getAccounts(pagination = this.pagination): void {
    this.accountsService
      .getAccounts({ ...pagination, ...this.order })
      .subscribe((response) => {
        if (pagination.offset === this.pagination.offset)
          this.pagination.offset += response.count;
        this.canLoadMore = this.pagination.offset < response.total;
        response.records = response.records.map((nextRecord) => ({
          ...nextRecord,
          change: nextRecord.amount - nextRecord.prevAmount,
        }));
        this.accounts = pagination.offset
          ? [...this.accounts, ...response.records]
          : response.records;
      });
  }
}
