import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/observable';
import { CartService } from '../cart-service.service';
import { Cart } from '../models/cart';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit{
  user : AppUser
  cart$ : Observable<Cart>
  constructor(private auth : AuthService, private cartService : CartService) { 
    
    this.auth.appUser$
      .subscribe(appUser =>this.user = appUser);
  }

  async ngOnInit(){
    this.cart$ = await this.cartService.getCart();
  }

  logout(){
    this.auth.logout();
  }

}
