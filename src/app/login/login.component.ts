import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ExchangeRatesService } from '../exchange-rates.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formGroup:FormGroup;
  constructor(
    private __fb:FormBuilder,
    private __exchangeRateService: ExchangeRatesService,
    private __router: Router
  ) { 

    this.formGroup = this.__buildFormGroup();
  }

  ngOnInit() {
  }

  __buildFormGroup():FormGroup {
    return this.__fb.group({
      usuario: [''],
      password: ['']
    })
  }

  login() {
    sessionStorage.setItem('user', JSON.stringify({id: 1, user: 'admin', token: 'asdasd'}));
    this.__router.navigate(['/exchange-rates']);
    this.__exchangeRateService.login(this.formGroup.value.usuario, this.formGroup.value.password).subscribe(result => {
    });
  }
}
