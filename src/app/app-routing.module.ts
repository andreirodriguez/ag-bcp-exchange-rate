import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExchangeRatesComponent } from './exchange-rates/exchange-rates.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
    },
  {
  path: 'exchange-rates',
  component: ExchangeRatesComponent
  },
  {
    path: '',
    redirectTo: 'exchange-rates',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
