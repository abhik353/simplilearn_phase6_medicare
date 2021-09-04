import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';
import { ProductCategory } from '../models/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';
  //private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { }

  // getProductList() : Observable<Product[]>{
  //   return this.httpClient.get<Product[]>(`${this.baseUrl}`)
  // }
  // getProductList(id: number): Observable<Product[]> {

  //   let searchUrl = `${this.baseUrl}/search/`
  //   return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
  //     map(response => response._embedded.products)
  //   )
  // }

  getProductListPaginate(page:number, size:number,id: number): Observable<GetResponseProducts> {

    let searchUrl = `${this.baseUrl}/?`+`page=${page}&size=${size}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  // getProductCategories(): Observable<ProductCategory[]> {
  //   return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
  //     map(response => response._embedded.productCategory)
  //   )
  // }

  getProduct(id:number):Observable<Product> {

    let searchUrl = `${this.baseUrl}/${id}`
    return this.httpClient.get<Product>(searchUrl);
  }

  // searchProducts(name: string): Observable<Product[]> {

  //   let searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${name}`
  //   return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
  //     map(response => response._embedded.products)
  //   )
  // }

  searchProductListPaginate(page:number, size:number,product: string): Observable<GetResponseProducts> {
    
    let searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${product}`+`&page=${page}&size=${size}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  addNewProduct(product: any): Observable<any>{
    return this.httpClient.post<any>(`${this.baseUrl}/`,product);
  }

  editProduct(product: any): Observable<any>{
    return this.httpClient.put<any>(`${this.baseUrl}/${product.id}`,product);
  }

  deleteProduct(id: any): Observable<any>{
    return this.httpClient.delete<any>(`${this.baseUrl}/${id}`);
  }
}


interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page:{
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProduct {
  _embedded: {
    products: Product;
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}
