import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { CartService } from './cart-service.service';

@Injectable()
export class OrderService {

  constructor(private db : AngularFireDatabase, private router : Router, private cartService : CartService) { }

  async pushOrder(order){
    let result = await this.db.list("/orders/").push(order);
    this.cartService.removeAllItemsFromCart();
    return result;
  }

}
