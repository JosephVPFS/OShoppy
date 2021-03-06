import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category.service';
import { ProductService } from '../../product.service';
import { Router, Route, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';
import { Product } from 'shared/models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  productEdit : Product = {$key : '', title:'', price:null, category:'', imageUrl:''};
  id;

  constructor(categoryService : CategoryService, 
    private productService : ProductService,
    private router : Router,
    private route : ActivatedRoute) {
    this.categories$ = categoryService.getCategories();
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) this.productService.get(this.id).take(1).subscribe(product => this.productEdit = product);
   }

   save(product){
     if(this.id) this.productService.update(this.id, product);
     else this.productService.create(product);
     this.router.navigate(['/admin/products']);
   }

   delete(){
     if(!confirm('Are you Sure, You want to Delete this Product?.')) return;
     this.productService.delete(this.id);
     this.router.navigate(['/admin/products']);
   }

  ngOnInit() {
  }

}


