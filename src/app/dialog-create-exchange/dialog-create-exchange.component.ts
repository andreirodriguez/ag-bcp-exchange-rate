import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExchangeRatesService } from '../exchange-rates.service';

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

  money = [
    {
      value: 1,
      viewValue: 'Dolar'
    },
    {
      value: 2,
      viewValue: 'Soles'
    },
    {
      value: 3,
      viewValue: 'Euros'
    }
  ]

  arrMoneyDestiny = [];
  ngOnInit() {
    this.hanlderValueChanges();
  }

  __buildFormGroup():FormGroup {
    return this.__fb.group({
      ticket: [''],
      amount: [''],
      money_origin: [''],
      money_destiny: [''],
      tipo_cambio: [''],
      user: [''],
      current_exchange: ['']
    })
  }
  findElementsMoney(id) {
    return this.arrMoneyDestiny.find(elem => elem.value == id);
  }

  hanlderValueChanges() {
    this.formGroup.valueChanges.subscribe(result => {
      if(result.amount != "" && result.tipo_cambio != "" && result.money_destiny) {
        const money_destiny = this.findElementsMoney(result.money_destiny);
        if(money_destiny.operator == 'm') this.formGroup.controls.current_exchange.setValue(result.amount * result.tipo_cambio, {emitEvent: false});
        else this.formGroup.controls.current_exchange.setValue(result.amount / result.tipo_cambio, {emitEvent: false});
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

  hanlderSaveExchange() {
    let objCreateExchange = this.formGroup.value;
    objCreateExchange.user = sessionStorage.getItem('user')['id'];
    console.log(objCreateExchange);
    this.__exchangeRateService.saveExchange(objCreateExchange).subscribe(
      result => {
        this.registerExchange.emit();
      },
      error => {
        alert('Hubo un error');
        //@TODO eliminar el emit y solo ponerlo en el result
        this.registerExchange.emit();
      }
    );
  }

}
