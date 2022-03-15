import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IExchangeRate } from './exchange-rates/exchange-rates.component';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRatesService {
  exchangeRateSubject = new Subject<IExchangeRate>();

  constructor(
    private __httpClient: HttpClient
  ) { }

  getDataByExchange(id):Observable<ExchangeRateResponse> {
    return this.__httpClient.get<ExchangeRateResponse>(environment.backend_url + `exchange-rates/${id}`);
 }

  getDataHistoryExchange(id):Observable<ExchangeRateResponse[]> {
    return this.__httpClient.get<ExchangeRateResponse[]>(environment.backend_url + `exchange-rates-audit/find-all/history?exchangeRateId=${1}&sort=register_datetime ASC`);
  }

  getAllExchange(currencyOriginId,currencyExchangeId,registerDateUntil,registerDateTo,pageIndex,pageSize):Observable<PaginationExchangeRateResponse> {
    currencyOriginId = currencyOriginId || 0;
    currencyExchangeId = currencyExchangeId || 0;

     return this.__httpClient.get<PaginationExchangeRateResponse>(environment.backend_url + `exchange-rates/find-all/inbox?currencyOriginId=${currencyOriginId}&currencyExchangeId=${currencyExchangeId}&registerDateUntil=${registerDateUntil}&registerDateTo=${registerDateTo}&pageIndex=${pageIndex}&pageSize=${pageSize}&sort=register_datetime ASC`);
  }

  getMoney():Observable<Currency[]> {
    return this.__httpClient.get<Currency[]>(environment.backend_url + `currencies/search/active?sort=symbol asc`);
  }

  getMoneyDestiny(currencyOriginId):Observable<CurrencyExchange[]> {
    return this.__httpClient.get<CurrencyExchange[]>(environment.backend_url + `currencies-exchange/search/currency-origin?currencyOriginId=${currencyOriginId}&sort=currency_exchange_symbol asc`);
  }

  saveExchange(objCreate: ExchangeRateRequest) {
    return this.__httpClient.post(environment.backend_url + `exchange-rates`, objCreate);
  }

  login(usuario, password) {
    return this.__httpClient.get(environment.backend_url);
  }
}

export interface PaginationExchangeRateResponse{
  pagination: Pagination;
  items: ExchangeRateResponse[];
}

export interface Pagination{
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  sort: String;
  total: number;
}

export interface ExchangeRateResponse{
  id: number;
  amountOrigin: number;
  amountExchange: number;
  rateExchange: number;
  currencyOriginId: number;
  currencyOriginTitle: String;
  currencyOriginSymbol: String;
  currencyExchangeId: number;
  currencyExchangeTitle: String;
  currencyExchangeSymbol: String;  
  registerUserId: number;
  registerUserFullname: String;
  registerDatetime: Date;
  active: Boolean;
}

export interface ExchangeRateRequest{
  amountOrigin: number;
  rateExchange: number;
  currencyOriginId: number;
  currencyExchangeId: number;
  registerUserId: number;
  registerUserFullname: String;
}

export interface Currency{
  id: number;
  title: String;
  symbol: String;
  active: Boolean;
}

export interface CurrencyExchange{
  id: number;
  currencyOriginId: number;
  currencyOriginTitle: String;
  currencyOriginSymbol: String;
  currencyExchangeId: number;
  currencyExchangeTitle: String;
  currencyExchangeSymbol: String;  
  mathematicalOperator: String;  
  rateExchange: number; 
  active: Boolean;
}
