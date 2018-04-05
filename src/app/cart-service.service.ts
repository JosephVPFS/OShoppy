import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { Cart } from 'shared/models/cart';
import {Observable} from 'rxjs/observable';
import { Product } from 'shared/models/product';

@Injectable()
export class CartService {

  constructor(private db : AngularFireDatabase) { }

  private create(){
    return this.db.list("/shopping-cart").push({dateCreated : (new Date()).getTime()});
  }

  async getCart() : Promise<Observable<Cart>>{
    let cartId = await this.getCartOrCreateId();
    return this.db.object('/shopping-cart/'+cartId)
      .map(x => new Cart(x.items));
  }

  getItem(cartId, productId){
    return this.db.object('/shopping-cart/'+cartId+"/items/"+productId);
  }

  private async getCartOrCreateId(){
    let cartId = localStorage.getItem('cartId');
    if(cartId)  return cartId;
    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;

  }

  async addToCart(product){
    this.updateCartQuantity(product, 1);
  }

  async removeOneItemFromCart(product){
    this.updateCartQuantity(product, -1);
  }

  private async updateCartQuantity(product : Product, change){
    let cartId = await this.getCartOrCreateId();
    let item$ = await this.getItem(cartId, product.$key);
    
    item$.take(1).subscribe(item => {
      let quantity = (item.quantity || 0) + change;
      if(quantity === 0)
        item$.remove();
      else item$.update({
        quantity : quantity,
        title : product.title,
        price : product.price,
        imageUrl : product.imageUrl
      })
    });
  }

  async removeAllItemsFromCart(){
    let cartId = await this.getCartOrCreateId();
    let cart = await this.db.object('/shopping-cart/'+cartId+"/items/");
    cart.remove();
  }
}
