import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/models/cart-item';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  selectedCategoryId: number = 1;
  searchMode: boolean = false; 
  pageNumber: number = 1;
  pageSize: number = 10;
  total : number = 10;
  prevCategoryId: number = 1;
  prevProductSearchName: string = '';

  constructor(private productService:ProductService,private cartService:ShoppingCartService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.getProducts();
    })
  }

  getProducts(){
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    this.searchMode ? (this.getSearchedProducts()): this.getAllProducts();   
  }

  getAllProducts(){
    let checkCateogryId: boolean = this.route.snapshot.paramMap.has('id');
    checkCateogryId ? (this.selectedCategoryId = +this.route.snapshot.paramMap.get('id')! ):
                      (this.selectedCategoryId = 1);

    this.prevCategoryId != this.selectedCategoryId && (this.pageNumber = 1);
    this.prevCategoryId = this.selectedCategoryId;
    this.productService.getProductListPaginate(this.pageNumber - 1,this.pageSize,
      this.selectedCategoryId).subscribe(this.processResult())
  }

  processResult(){
    return (data: { _embedded: { products: Product[]; }; page: { number: number; size: number; totalElements: number; }; }) => {
      this.products = data._embedded.products;
      this.pageNumber = data.page.number + 1;
      this.pageSize = data.page.size;
      this.total = data.page.totalElements; 
    }
  }

  getSearchedProducts(){
    let keyword: string = this.route.snapshot.paramMap.get('keyword')!;
    this.prevProductSearchName != keyword && (this.pageNumber = 1);
    this.prevProductSearchName = keyword;
    this.productService.searchProductListPaginate(this.pageNumber - 1, this.pageSize, keyword).subscribe(this.processResult());
  }

  changePageSize(size: any){
    this.pageSize = size.target.value;
    this.pageNumber = 1;
    this.getAllProducts();
  }

  onAddToCart(product: any){
    const cartItem = new CartItem(product);
    this.cartService.addToCart(cartItem)
  }
}
