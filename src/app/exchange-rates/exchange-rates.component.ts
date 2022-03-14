import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { DialogCreateExchangeComponent } from '../dialog-create-exchange/dialog-create-exchange.component';
import { DialogEditExchangeComponent } from '../dialog-edit-exchange/dialog-edit-exchange.component';
import { ExchangeRateResponse, ExchangeRatesService, PaginationExchangeRateResponse } from '../exchange-rates.service';

@Component({
  selector: 'app-exchange-rates',
  templateUrl: './exchange-rates.component.html',
  styleUrls: ['./exchange-rates.component.scss']
})
export class ExchangeRatesComponent implements OnInit {
  dataSource:MatTableDataSource<ExchangeRateResponse> = new MatTableDataSource();
  displayedColumns = ['id','amountOrigin','rateExchange','amountExchange','registerDatetime','registerUserFullname','actions'];
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
    this.__exchangeRatesService.getAllExchange(0,0,"","",1, this.pageSize).subscribe(result => {
      this.dataSource.data = result.items;
      this.length = result.pagination.total;
    });  
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

    this.__exchangeRatesService.getAllExchange(0,0,"","",this.pageNumber, this.pageSize).subscribe(result => {
      this.dataSource.data = result.items;
      this.length = result.pagination.total;
    });  
  }

}

export interface IExchangeRate {
  ticket: number;
  amount: number;
  date_register: Date;
  username: string;
  id?:number;
}