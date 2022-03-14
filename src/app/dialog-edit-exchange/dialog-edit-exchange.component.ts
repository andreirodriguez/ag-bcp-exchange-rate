import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExchangeRateResponse, ExchangeRatesService } from '../exchange-rates.service';
import {MatTableDataSource, MAT_DIALOG_DATA} from '@angular/material';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-dialog-edit-exchange',
  templateUrl: './dialog-edit-exchange.component.html',
  styleUrls: ['./dialog-edit-exchange.component.scss']
})
export class DialogEditExchangeComponent implements OnInit {

  formGroup:FormGroup;

  money = []
  arrMoneyDestiny = [];

  //SECOND TAB
  dataSource:MatTableDataSource<ExchangeRateResponse> = new MatTableDataSource();
  displayedColumns = ['amountOrigin','rateExchange','amountExchange','registerDatetime','registerUserFullname'];

  constructor(
    private __fb: FormBuilder,
    private __exchangeRateService: ExchangeRatesService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit() {

    this.__exchangeRateService.getMoney().subscribe(result => {
      this.money = result;
    });

    this.__exchangeRateService.getDataByExchange(this.data.id).subscribe(exchangeRate => {
      debugger;
      this.__exchangeRateService.getMoneyDestiny(exchangeRate.currencyOriginId).subscribe( result => {
        this.arrMoneyDestiny = result;

        this.formGroup = this.__buildFormGroup(exchangeRate);        
      });
    });     

    this.__exchangeRateService.getDataHistoryExchange(this.data.id).subscribe(result => {
      this.dataSource.data = result
    });    

  }


  findElementsMoney(id) {
    return this.arrMoneyDestiny.find(elem => elem.value == id);
  }

  hanlderValueChanges() {
    this.formGroup.valueChanges.subscribe(result => {
      if(result.amountOrigin != "" && result.rateExchange != "" && result.currencyExchangeId) 
      {
        const money_destiny = this.findElementsMoney(result.money_destiny);

        if(money_destiny.mathematicalOperator == 'm') 
          this.formGroup.controls.amountExchange.setValue(result.amountOrigin * result.rateExchange, {emitEvent: false});
        else 
          this.formGroup.controls.amountExchange.setValue(result.amountOrigin / result.rateExchange, {emitEvent: false});
      }
    })

    this.formGroup.controls.money_origin.valueChanges.subscribe(result => {
      console.log(result);
      this.arrMoneyDestiny = [
        {
          value: 2,
          viewValue: 'Soles',
          operator: 'm'
        },
        {
          value: 3,
          viewValue: 'Euros',
          operator: 'd'
        }
      ]
      this.__exchangeRateService.getMoneyDestiny(result).subscribe( result => {
        //Setear lista de monedas destino
      })
    })
  }


  __buildFormGroup(data):FormGroup {
    return this.__fb.group({
      id: [data.id || ""],
      currencyOriginId: [data.currencyOriginId || ""],
      amountOrigin: [data.amountOrigin || ""],
      currencyExchangeId: [data.currencyExchangeId || ""],      
      rateExchange: [data.rateExchange || ""],
      amountExchange: [data.amountExchange || ""]      
    })
  }


}
