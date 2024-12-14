import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AddProduct } from '../common/add-product';
import { ProductCategory } from '../common/product-category';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: Product[] = [];
  categoryId: Subject<number> = new BehaviorSubject<number>(0);
  private baseUrl: string = 'http://localhost:8080/products';
  private productCategoryUrl: string = 'http://localhost:8080/product-category';

  constructor(private httpClient: HttpClient) {}

  getProductList(thePage: number, thePageSize: number): Observable<Product[]> {
    const productsUrl = `${this.baseUrl}?page=${thePage}&size=${thePageSize}`;
    // return this.httpClient
    //   .get<GetResponseProduct>(this.baseUrl)
    //   .pipe(map((response) => response._embedded.products));
    return this.httpClient.get<Product[]>(productsUrl);
  }

  getProduct(productId: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.baseUrl}/${productId}`);
  }

  getProductSearch(
    thePage: number,
    thePageSize: number,
    productName: string
  ): Observable<Product[]> {
    const searchUrl: string = `${this.baseUrl}/search/findByNameContaining?name=${productName}&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<Product[]>(searchUrl);
  }

  addProduct(product: AddProduct): Observable<AddProduct> {
    return this.httpClient.post<AddProduct>(this.baseUrl, product);
  }

  getProductCategory(): Observable<ProductCategory[]> {
    return this.httpClient.get<ProductCategory[]>(this.productCategoryUrl);
  }

  getProductCategoryList(id: number): Observable<Product[]> {
    const url: string = `${this.baseUrl}/search/findByCategory?id=${id}`;
    return this.httpClient.get<Product[]>(url);
  }
}

interface GetResponseProduct {
  _embedded: {
    products: Product[];
  };
}
