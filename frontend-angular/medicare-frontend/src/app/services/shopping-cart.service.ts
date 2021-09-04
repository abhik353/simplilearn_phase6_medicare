import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  addToCart(cartItem: CartItem) {
    let itemExistInCart: boolean = false;
    let existingCartItem : any = undefined!;

    if (this.cartItems.length > 0) {
      existingCartItem = this.cartItems.find(currentCartItem => currentCartItem.id == cartItem.id)
      itemExistInCart = (existingCartItem != undefined);
    }
    itemExistInCart ? existingCartItem.quantity++ : this.cartItems.push(cartItem)
    this.calculateCartTotals();
  }

  removeFromCart(cartItem: CartItem){
    cartItem.quantity--;
    cartItem.quantity == 0 ? 
    this.removeItem(cartItem) :
    this.calculateCartTotals();
  }

  removeItem(cartItem: CartItem){
    const itemIndex = this.cartItems.findIndex(tempCartItem => tempCartItem.id == cartItem.id);
    itemIndex > -1 &&
    (this.cartItems.splice(itemIndex, 1),
     this.calculateCartTotals())
  }

  calculateCartTotals(){
    let totalPrice : number = 0;
    let totalQuantity: number = 0;

    this.cartItems.forEach(currentCartItem => {
      totalPrice += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantity += currentCartItem.quantity;
    })
    this.totalPrice.next(totalPrice);
    this.totalQuantity.next(totalQuantity);
  }
}
