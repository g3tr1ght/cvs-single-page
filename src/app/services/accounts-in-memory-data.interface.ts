export type ICurrency = 'USD';

export type IAllAccounts = string[];

export interface IAccount {
  id: string;
  name: string;
  amount: number;
  prevAmount: number;
  change?: number;
  currency: ICurrency;
}

export interface IAccountsById {
  [id: string]: IAccount;
}

export type IAccountsOrderTerm =
  | 'id'
  | 'name'
  | 'amount'
  | 'prevAmount'
  | 'currency';

export type IOrder = 'asc' | 'desc';

export interface IPaginationConfig {
  limit?: number;
  offset?: number;
}

export interface IOrderingConfig {
  orderBy?: IAccountsOrderTerm;
  order?: IOrder;
}

export interface IAccountsInMemoryDataServiceConfig
  extends IPaginationConfig,
    IOrderingConfig {}

export interface IGetAccountsReq extends IPaginationConfig, IOrderingConfig {}

export type IGetAccountsRes = IAccount[];

export interface IGetAccountsWithPaginationRes {
  total: number;
  count: number;
  records: IAccount[];
}
