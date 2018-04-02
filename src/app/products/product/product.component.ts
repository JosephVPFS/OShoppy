import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product';
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

  removeOneFromCart(product : Product){
    this.cartService.removeOneItemFromCart(product);
  }

  getQuantity(){
    if(!this.shoppingCart) return 0;
    let item = this.shoppingCart.items[this.product.$key];
    if(!item){
      return 0;
    }
    return (item) ? (item.quantity) ? item.quantity : 0 : 0;
  }
}
