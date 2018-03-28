import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from '../../category.service';

@Component({
  selector: 'products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.css']
})
export class ProductsFilterComponent implements OnInit {
  categories$;
  @Input('category') category;
  @Input('fetched') fetched;
  constructor(categoryService : CategoryService) {
    this.categories$ = categoryService.getCategories();
   }

  ngOnInit() {
  }

}
