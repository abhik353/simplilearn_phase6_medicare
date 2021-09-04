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

  constructor(private httpClient: HttpClient) { }

  getProductListPaginate(page:number, size:number,id: number): Observable<GetResponseProducts> {

    let searchUrl = `${this.baseUrl}/?`+`page=${page}&size=${size}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }


  getProduct(id:number):Observable<Product> {

    let searchUrl = `${this.baseUrl}/${id}`
    return this.httpClient.get<Product>(searchUrl);
  }


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
