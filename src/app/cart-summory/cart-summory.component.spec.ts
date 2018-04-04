import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartSummoryComponent } from './cart-summory.component';

describe('CartSummoryComponent', () => {
  let component: CartSummoryComponent;
  let fixture: ComponentFixture<CartSummoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartSummoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartSummoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
