import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'shared/models/product';
import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import 'rxjs/add/operator/switchMap'
import { CartService } from '../cart-service.service';
import { Subscription } from 'rxjs/Subscription';
import { Cart } from 'shared/models/cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products : Product[] = [];
  filteredProducts : Product[] = [];
  fetched : boolean = false;
  category : string;
  subscription : Subscription;
  shoppingCart;
  constructor(prodService : ProductService, route : ActivatedRoute,private cartService : CartService) {
    prodService.getProducts().subscribe(prods => {
        this.products = prods;
        this.fetched = true;
        return route.queryParamMap.subscribe(params => {
          this.category = params.get('category');
          this.filteredProducts = (this.category) ? this.products.filter(p => p.category === this.category) :
                                this.products;
      });
    });
   }

  async ngOnInit() {
    this.subscription = (await this.cartService.getCart()).subscribe(cart => {
      this.shoppingCart = cart;
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
