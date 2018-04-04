import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { CartService } from '../cart-service.service';
import { AuthService } from '../auth.service';
import { Cart } from '../models/cart';
import { Router } from '@angular/router';
import { ShippingDetails } from '../models/shipping';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  shippingDetail : ShippingDetails = new ShippingDetails();
  cart : Cart;
  userId : string;
  constructor(private orderService : OrderService,
              private cartService : CartService,
              private auth : AuthService,
              private router : Router) { }

  async ngOnInit() {
    let cart$ = await this.cartService.getCart();
    cart$.subscribe(cart => this.cart = cart);
    this.auth.getCurrentUser().subscribe(user => {
      this.userId = user.uid;
    })
  }

  async pushOrder(){
    let order = {
      datePlaced : (new Date()).toDateString(),
      userId : this.userId,
      shipping : this.shippingDetail,
      items : this.cart.cartItemsG.map(i => {
        return {
          product : {
            title : i.title,
            price : i.price,
            imageUrl : i.imageUrl
          },
          quantity : i.quantity,
          totalPrice : i.totalPrice
        }
      })
    }
    let result = await this.orderService.pushOrder(order);
    this.router.navigate(['/order-success', result.key]);
    
  }

}
