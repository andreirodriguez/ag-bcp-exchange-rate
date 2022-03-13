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

  getDataByExchange(id):Observable<any> {
    return this.__httpClient.get(environment.backend_url);
 }

  getDataHistoryExchange(id):Observable<any> {
    return this.__httpClient.get(environment.backend_url);
  }

  getAllExchange():Observable<any> {
     return this.__httpClient.get(environment.backend_url);
  }

  getMoneyDestiny(moneySelected):Observable<any> {
    return this.__httpClient.get(environment.backend_url);
  }

  saveExchange(objCreate) {
    return this.__httpClient.post(environment.backend_url, objCreate);
  }

  login(usuario, password) {
    return this.__httpClient.get(environment.backend_url);
  }
}
