import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;
  constructor( private cartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.getCartDetails();
  }

  getCartDetails(){
    this.cartItems = this.cartService.cartItems;

    this.cartService.totalPrice.subscribe(data => {
      this.totalPrice = data;
    })

    this.cartService.totalQuantity.subscribe(data => {
      this.totalQuantity = data;
    })

    this.cartService.calculateCartTotals();
  }

  increaseQuantity(cartItem: any){
    this.cartService.addToCart(cartItem);
  }

  decreaseQuantity(cartItem: any){
    this.cartService.removeFromCart(cartItem);
  }

  removeCurrentItem(cartItem: any){
    this.cartService.removeItem(cartItem)
  }
}
