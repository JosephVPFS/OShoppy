import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart-service.service';
import { Cart } from '../models/cart';
import { Observable } from 'rxjs/observable';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$ : Observable<Cart>;
  constructor(private cartService : CartService) { }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
  }

}
