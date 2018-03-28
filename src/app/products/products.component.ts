import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import 'rxjs/add/operator/switchMap'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products : Product[] = [];
  filteredProducts : Product[] = [];
  fetched : boolean = false;
  category : string;
  constructor(prodService : ProductService, route : ActivatedRoute) {
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

  ngOnInit() {
  }

}
