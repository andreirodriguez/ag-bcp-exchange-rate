import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateExchangeComponent } from './dialog-create-exchange.component';

describe('DialogCreateExchangeComponent', () => {
  let component: DialogCreateExchangeComponent;
  let fixture: ComponentFixture<DialogCreateExchangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCreateExchangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCreateExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
