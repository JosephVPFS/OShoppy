import { Component, OnInit, Input } from '@angular/core';
import { ShippingDetails } from 'shared/models/shipping';
import { OrderService } from '../order.service';
import { CartService } from '../cart-service.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit {
  shippingDetail : ShippingDetails = new ShippingDetails();
  userId : string;
  @Input('cart') cart;
  constructor(private orderService : OrderService,
              private cartService : CartService,
              private auth : AuthService,
              private router : Router) { }

  ngOnInit() {
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
