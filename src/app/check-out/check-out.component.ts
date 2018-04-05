import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { CartService } from '../cart-service.service';
import { AuthService } from '../auth.service';
import { Cart } from 'shared/models/cart';
import { Router } from '@angular/router';
import { ShippingDetails } from 'shared/models/shipping';
import { Observable } from 'rxjs/observable';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  
  cart$ : Observable<Cart>;
  constructor(private cartService : CartService) { }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
  }

  

}
