import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExchangeRateRequest, ExchangeRatesService } from '../exchange-rates.service';

@Component({
  selector: 'app-dialog-create-exchange',
  templateUrl: './dialog-create-exchange.component.html',
  styleUrls: ['./dialog-create-exchange.component.scss']
})
export class DialogCreateExchangeComponent implements OnInit {
  formGroup:FormGroup;
  currentExchange:number;
  @Output() registerExchange = new EventEmitter();

  constructor(
    private __fb: FormBuilder,
    private __exchangeRateService: ExchangeRatesService
  ) {
    this.formGroup = this.__buildFormGroup();
   }

   __buildFormGroup():FormGroup {
    return this.__fb.group({
      currencyOriginId: [''],
      amountOrigin: [''],
      currencyExchangeId: [''],      
      rateExchange: [''],
      amountExchange: ['']
    })
  }

  money = []
  arrMoneyDestiny = [];
  ngOnInit() {

    this.__exchangeRateService.getMoney().subscribe(result => {
      this.money = result;

      this.hanlderValueChanges();
    }); 
    
    
  }


  findElementsMoney(id) {
    return this.arrMoneyDestiny.find(elem => elem.currencyExchangeId == id);
  }

  hanlderValueChanges() {

    this.formGroup.valueChanges.subscribe(result => {
      if(result.amountOrigin != "" && result.rateExchange != "" && result.currencyExchangeId) 
      {
        console.log(result.currencyExchangeId);

        const money_destiny = this.findElementsMoney(result.currencyExchangeId);
        console.log(money_destiny);
        if(money_destiny.mathematicalOperator == 'M') 
          this.formGroup.controls.amountExchange.setValue((result.amountOrigin * result.rateExchange).toFixed(2), {emitEvent: false});
        else 
        this.formGroup.controls.amountExchange.setValue((result.amountOrigin / result.rateExchange).toFixed(2), {emitEvent: false});
      }
    })

    this.formGroup.controls.currencyOriginId.valueChanges.subscribe(result => {
      this.__exchangeRateService.getMoneyDestiny(result).subscribe( result => {
        this.arrMoneyDestiny = result;
      })
    })

    this.formGroup.controls.currencyExchangeId.valueChanges.subscribe(currencyExchangeId => {
      if(currencyExchangeId) 
      {
        if(this.formGroup.controls.rateExchange.value =="")
        {
          const money_destiny = this.findElementsMoney(currencyExchangeId);

          this.formGroup.controls.rateExchange.setValue(money_destiny.rateExchange);
        }
      }      
    })    

  }

  hanlderSaveExchange() {
    let objCreateExchange:ExchangeRateRequest = {
      currencyOriginId: this.formGroup.value.currencyOriginId,
      amountOrigin: this.formGroup.value.amountOrigin,
      currencyExchangeId: this.formGroup.value.currencyExchangeId,
      rateExchange: this.formGroup.value.rateExchange,
      registerUserId: JSON.parse(sessionStorage.getItem('user'))['id'],
      registerUserFullname: JSON.parse(sessionStorage.getItem('user'))['user']
    };

    this.__exchangeRateService.saveExchange(objCreateExchange).subscribe(
      result => {
        this.registerExchange.emit();
      },
      error => {
        alert('Hubo un error');
      }
    );
  }

}
