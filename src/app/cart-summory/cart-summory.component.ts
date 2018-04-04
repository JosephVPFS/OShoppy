import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cart-summory',
  templateUrl: './cart-summory.component.html',
  styleUrls: ['./cart-summory.component.css']
})
export class CartSummoryComponent implements OnInit {
  @Input('cart') cart;
  constructor() { }

  ngOnInit() {
  }

}
