import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { OrderItem } from 'src/app/models/orderItem';
import { Purchase } from 'src/app/models/purchase';
import { CheckoutService } from 'src/app/services/checkout.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  totalPrice: number = 0;
  totalQuantity: number = 0;

  checkoutForm: any = {
    contact:{
      firstName:'',
      lastName:'',
      email:''
    },
    address:{      
      street:'',
      city:'',
      pincode:'',
      country:'',
    },
    payment:{
      upi:''
    }
  }

  constructor(private cartService: ShoppingCartService, private checkoutService: CheckoutService, private router: Router) { }

  ngOnInit(): void {
    this.reviewCartDetails()
  }

  checkoutFromSubmit(form:NgForm){
    console.log(this.checkoutForm)
    let order : Order = { totalPrice : 0, totalQuantity: 0};
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;
    console.log("cart items: ",this.cartService.cartItems)
    const cartItems = this.cartService.cartItems;

    let orderItems: OrderItem[] = [];
    for (let i=0; i < cartItems.length; i++) {
      orderItems[i] = new OrderItem(cartItems[i]);
    }


    let purchase = new Purchase();

    purchase.shippingAddress = this.checkoutForm.address;
    purchase.customer = this.checkoutForm.contact;
    purchase.order = order;
    purchase.orderItems = orderItems;
    console.log("purchase: ",purchase)
    this.checkoutService.placeOrder(purchase).subscribe(data => {
      alert(`order placed successfully. Order ID: ${data.trackingId}`)
      this.resetCart(form);
    },
    error => console.log(error))
  }

  resetCart(form: NgForm){
      this.cartService.cartItems = [];
      this.cartService.totalPrice.next(0);
      this.cartService.totalQuantity.next(0);
      form.reset();
      this.router.navigateByUrl("/products");
  }

  reviewCartDetails(){
    this.cartService.totalQuantity.subscribe(data =>{
      this.totalQuantity = data
    })
    this.cartService.totalPrice.subscribe(data =>{
      this.totalPrice = data
    })
  }
}
