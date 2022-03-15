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
    ) { 
    }

  ngOnInit() {

    this.formGroup = this.__fb.group({
      id: [null],
      currencyOriginId: [null],
      amountOrigin: [null],
      currencyExchangeId: [null],      
      rateExchange: [null],
      amountExchange: [null]      
    });
    
    this.hanlderValueChanges();    

    this.__exchangeRateService.getMoney().subscribe(result => {
      this.money = result;
    });


    this.__exchangeRateService.getDataByExchange(this.data.id).subscribe(exchangeRate => {
      this.__exchangeRateService.getMoneyDestiny(exchangeRate.currencyOriginId).subscribe( result => {
        this.arrMoneyDestiny = result;

        this.__buildFormGroup(exchangeRate);        
      }); 
    });     

    this.__exchangeRateService.getDataHistoryExchange(this.data.id).subscribe(result => {
      this.dataSource.data = result
    });    

  }


  findElementsMoney(id) {
    return this.arrMoneyDestiny.find(elem => elem.currencyExchangeId == id);
  }

  hanlderValueChanges() {
    this.formGroup.valueChanges.subscribe(result => {
      if(result.amountOrigin != "" && result.rateExchange != "" && result.currencyExchangeId) 
      {
        const money_destiny = this.findElementsMoney(result.currencyExchangeId);

        if(money_destiny.mathematicalOperator == 'M') 
          this.formGroup.controls.amountExchange.setValue((result.amountOrigin * result.rateExchange).toFixed(2), {emitEvent: false});
        else 
          this.formGroup.controls.amountExchange.setValue((result.amountOrigin / result.rateExchange).toFixed(2), {emitEvent: false});
      }
    });

    this.formGroup.controls.currencyOriginId.valueChanges.subscribe(result => {
      this.__exchangeRateService.getMoneyDestiny(result).subscribe( result => {
        this.arrMoneyDestiny = result;
      })
    });
    
    this.formGroup.controls.currencyExchangeId.valueChanges.subscribe(currencyExchangeId => {
      if(currencyExchangeId) 
      {
        if(this.formGroup.controls.rateExchange.value =="")
        {
          const money_destiny = this.findElementsMoney(currencyExchangeId);

          this.formGroup.controls.rateExchange.setValue(money_destiny.rateExchange);
        }
      }      
    });      
  }


  __buildFormGroup(data) {
    this.formGroup.get("id").setValue(data.id,{emitEvent: false});
    this.formGroup.get("currencyOriginId").setValue(data.currencyOriginId,{emitEvent: false});
    this.formGroup.get("amountOrigin").setValue(data.amountOrigin,{emitEvent: false});
    this.formGroup.get("currencyExchangeId").setValue(data.currencyExchangeId,{emitEvent: false});
    this.formGroup.get("rateExchange").setValue(data.rateExchange,{emitEvent: false});
    this.formGroup.get("amountExchange").setValue(data.amountExchange,{emitEvent: false});
  }


}
