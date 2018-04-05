import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'shared/models/product';
import { CartService } from '../../cart-service.service';

@Component({
  selector: 'product-card',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input('product') product;
  @Input('showActions') showActions;
  @Input('shoppingCart') shoppingCart;
  constructor(private cartService : CartService) { }

  ngOnInit() {
  }

  addToCart(product : Product){
    this.cartService.addToCart(product);
  }

}
