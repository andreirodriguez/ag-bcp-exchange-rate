import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { DialogCreateExchangeComponent } from '../dialog-create-exchange/dialog-create-exchange.component';
import { DialogEditExchangeComponent } from '../dialog-edit-exchange/dialog-edit-exchange.component';
import { ExchangeRatesService } from '../exchange-rates.service';

@Component({
  selector: 'app-exchange-rates',
  templateUrl: './exchange-rates.component.html',
  styleUrls: ['./exchange-rates.component.scss']
})
export class ExchangeRatesComponent implements OnInit {
  dataSource:MatTableDataSource<IExchangeRate> = new MatTableDataSource();
  displayedColumns = ['ticket','amount','date_register','username', 'actions'];
  pageSize:number = 5
  length:number;
  pageSizeOptions:Array<number> = [5,10,15]
  pageNumber:number;


  constructor(
    private __exchangeRatesService: ExchangeRatesService,
    public dialog: MatDialog
  ) { 
    //this.dataSource.data = 
    //this.openDialogCreateExchange();
  }

  ngOnInit() {
    this.handleGetAllExchange();
  }

  handleGetAllExchange() {
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
    this.length = 15
    this.__exchangeRatesService.getAllExchange(/* this.pageNumber, this.pageSize */).subscribe(result => {
    })  
  }

  openDialogCreateExchange() {
    const dialogRef = this.dialog.open(DialogCreateExchangeComponent);
    dialogRef.componentInstance.registerExchange.subscribe( 
      result => {
        console.log('Se realizó el registro');
        dialogRef.close();
        this.handleGetAllExchange();
      }
    )
  }

  openDialogEditExchange(id) {
    const dialogRef = this.dialog.open(DialogEditExchangeComponent, {
      data: {id}
    });
  }

  handlerChangePagination(event) {
    console.log(event);
    this.pageNumber = event.pageIndex;
    this.pageSize = event.pageSize;

    this.__exchangeRatesService.getAllExchange(/* this.pageNumber, this.pageSize */).subscribe(result => {
    })

    this.dataSource.data = [
      {
        ticket: 2000,
        amount: 1240.5,
        date_register: new Date,
        username: 'admin'
      },
      {
        ticket: 2001,
        amount: 1400.5,
        date_register: new Date(),
        username: 'admin'
      },
      {
        ticket: 2002,
        amount: 1500.5,
        date_register: new Date,
        username: 'admin'
      },
      {
        ticket: 2003,
        amount: 3000.5,
        date_register: new Date(),
        username: 'admin'
      },
      {
        ticket: 2004,
        amount: 500.5,
        date_register: new Date(),
        username: 'admin'
      }
      
    ]
  }

}

export interface IExchangeRate {
  ticket: number;
  amount: number;
  date_register: Date;
  username: string;
  id?:number;
}