import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { CartService } from '../cart-service.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {

  @Input('product') product;
  @Input('shoppingCart') shoppingCart;
  constructor(private cartService : CartService) { }

  ngOnInit() {
  }

  addToCart(product : Product){
    this.cartService.addToCart(product);
  }

  removeOneFromCart(product : Product){
    this.cartService.removeOneItemFromCart(product);
  }

  
}
