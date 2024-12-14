import { Subject, BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  page: number = 1;
  pageSize: number = 20;
  totalElements: number = 1;
  searchMode: boolean = false;
  hasCategory: boolean = false;
  isAuthenticated: boolean = false;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.listProducts();
    this.isAuthenticated = this.authService.isUserLoggedIn();
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    this.hasCategory = this.route.snapshot.paramMap.has('category');
    if (this.searchMode) {
      this.searchProducts();
    } else if (this.hasCategory) {
      this.handleProductCategoryList();
    } else {
      this.handleProductList();
      console.log('products');
    }
  }

  handleProductCategoryList() {
    const categoryId: string = this.route.snapshot.paramMap.get('category')!;
    this.productService.categoryId.next(+categoryId);
    this.productService.categoryId.subscribe((data) => {
      this.productService
        .getProductCategoryList(data)
        .subscribe(this.processProducts());
    });
  }

  searchProducts() {
    const keyword: string = this.route.snapshot.paramMap.get('keyword')!;
    this.productService
      .getProductSearch(this.page - 1, this.pageSize, keyword)
      .subscribe(this.processProducts());
    console.log(keyword);
  }

  handleProductList() {
    this.productService
      .getProductList(this.page - 1, this.pageSize)
      .subscribe(this.processProducts());
  }

  addToCart(product: Product) {
    const tempCartItem: CartItem = new CartItem(
      product.id,
      product.name,
      product.price,
      1,
      product.thumbnail,
      product.price
    );
    this.cartService.addToCart(tempCartItem);
  }

  processProducts() {
    return (data: any) => {
      this.productService.products = data._embedded.products;
      this.products = this.productService.products;
      this.page = data.page.number + 1;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    };
  }

  updatePage(pageSize: string) {
    this.page = 1;
    this.pageSize = +pageSize;
    this.handleProductList();
  }
}
