import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExchangeRatesService } from '../exchange-rates.service';
import {MatTableDataSource, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-dialog-edit-exchange',
  templateUrl: './dialog-edit-exchange.component.html',
  styleUrls: ['./dialog-edit-exchange.component.scss']
})
export class DialogEditExchangeComponent implements OnInit {

  formGroup:FormGroup;

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

  //SECOND TAB
  dataSource:MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns = ['ticket','amount','date_register','username'];
  pageSize:number = 5
  length:number;
  pageSizeOptions:Array<number> = [5,10,15]
  pageNumber:number;


  constructor(
    private __fb: FormBuilder,
    private __exchangeRateService: ExchangeRatesService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit() {
    let data = {
      ticket: 1,
      amount: 1000,
      money_origin: 1,
      money_destiny: 2,
      tipo_cambio: 2,
      username: 'admin',
      current_exchange: 2000,
    }
    this.formGroup = this.__buildFormGroup(data);
    this.getDataExchangeByID(this.data.id);



    //@TODO setear arrMoneyDestiny en el subscribe
    this.arrMoneyDestiny = [
      {
        value: 2,
        viewValue: 'Soles'
      },
      {
        value: 3,
        viewValue: 'Euros'
      }
    ]
    this.__exchangeRateService.getMoneyDestiny(data.money_origin).subscribe( result => {
      //Setear lista de monedas destino
    })


    //OBTENER DATA HISTORICA
    this.dataSource.data = [
      {
        ticket: 1000,
        id: 1,
        amount: 1240.5,
        date_register: new Date,
        username: 'admin'
      },
      {
        ticket: 1001,
        id: 2,
        amount: 950.5,
        date_register: new Date(),
        username: 'admin'
      },
      {
        ticket: 1000,
        id: 3,
        amount: 1240.5,
        date_register: new Date,
        username: 'admin'
      },
      {
        ticket: 1001,
        id: 4,
        amount: 950.5,
        date_register: new Date(),
        username: 'admin'
      },
      {
        ticket: 1001,
        id: 5,
        amount: 950.5,
        date_register: new Date(),
        username: 'admin'
      }
    ]
    this.__exchangeRateService.getDataHistoryExchange(this.data.id).subscribe(result => {
      this.dataSource.data = result
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

  getDataExchangeByID(id) {
    this.__exchangeRateService.getDataByExchange(id).subscribe( result => {
      //@TODO setear data despues de obtenerla
      //this.formGroup = this.__buildFormGroup(result);
    })
  }

  __buildFormGroup(data):FormGroup {
    return this.__fb.group({
      ticket: [data.ticket],
      amount: [data.amount],
      money_origin: [data.money_origin],
      money_destiny: [data.money_destiny],
      tipo_cambio: [data.tipo_cambio],
      username: [data.username],
      current_exchange: [data.current_exchange]
    })
  }


}
