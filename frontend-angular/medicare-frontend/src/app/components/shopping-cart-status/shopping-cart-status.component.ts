import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart-status',
  templateUrl: './shopping-cart-status.component.html',
  styleUrls: ['./shopping-cart-status.component.css']
})
export class ShoppingCartStatusComponent implements OnInit {

  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  constructor(private cartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.updateCartInfo()
  }

  updateCartInfo(){
    this.cartService.totalPrice.subscribe(data => {
      this.totalPrice = data;
    })
    this.cartService.totalQuantity.subscribe(data => {
      this.totalQuantity = data;
    })
  }
}
