import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  products: Product[] = [];
  selectedCategoryId: number = 1;
  searchMode: boolean = false; 
  pageNumber: number = 1;
  pageSize: number = 10;
  total : number = 10;
  prevCategoryId: number = 1;
  prevProductSearchName: string = '';
  showAddPopUp: boolean = false;
  product: any = this.initializeProduct();

  constructor(private productService: ProductService,private oktaAuthService: OktaAuthService ) {}

  ngOnInit(): void {
    this.getAllProducts()
  }

  getAllProducts(){
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

  addProduct(){
    console.log(this.product)
    !this.product.id ? 
    this.productService.addNewProduct(this.product).subscribe(data => {
      this.getAllProducts();
      this.product = this.initializeProduct();
    }):
    this.productService.editProduct(this.product).subscribe(data => {
      this.getAllProducts();
      this.product = this.initializeProduct();
    })
  }

  onEditProduct(product: any){
    this.product = product;
  }

  deleteProduct(id: any){
    this.productService.deleteProduct(id).subscribe(data => {
      this.getAllProducts();
      this.product = this.initializeProduct();
    })
  }

  initializeProduct(){
    return {
      name:'',
      description:'',
      imageUrl:'',
      active: true,
      unitsInStock: 0,
      unitPrice:'',
      dateCreated: new Date()
    };
  }
}
