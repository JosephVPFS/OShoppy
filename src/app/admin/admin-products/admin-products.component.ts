import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../product.service';
import { Subscription } from 'rxjs/Subscription';
import { Product } from 'shared/models/product';
import { DataTableResource } from 'angular5-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products : Product[];
  filteredProducts : Product[];
  subscription : Subscription;
  dataTableResource : DataTableResource<Product>;
  items : Product[] = [];
  itemsCount = 0;
  constructor(productService : ProductService) { 
    this.subscription = productService.getProducts().subscribe( prods => {
      this.products = this.filteredProducts = prods;
      this.initializeTableResource(prods);
    });
  }

  private initializeTableResource(products){
    this.dataTableResource = new DataTableResource(products);
    this.dataTableResource.query({offset:0}).then(prods => this.items = prods);
    this.dataTableResource.count().then(count => this.itemsCount = count);
  }

  reloadItems(params){
    if(!this.dataTableResource) return;
    this.dataTableResource.query(params).then(prods => this.items = prods);
  }

  filter(query : string){
    console.log(query);
    this.filteredProducts = (query) ? this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : this.products;
    this.initializeTableResource(this.filteredProducts);
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
