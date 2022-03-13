import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditExchangeComponent } from './dialog-edit-exchange.component';

describe('DialogEditExchangeComponent', () => {
  let component: DialogEditExchangeComponent;
  let fixture: ComponentFixture<DialogEditExchangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEditExchangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
