import { ProductCategory } from './../../common/product-category';
import { ProductService } from 'src/app/service/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css'],
})
export class ProductCategoryComponent implements OnInit {
  productCategory: ProductCategory[] = [];
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProductCategory().subscribe((data: any) => {
      this.productCategory = data._embedded.productCategory;
    });
  }

  itemChanged(categoryId: number) {
    this.productService.categoryId.next(categoryId);
  }
}
