// import { Component } from '@angular/core';

// @Component({
//   selector: 'avans-nx-workshop-cart-list',
//   templateUrl: './cart-list.component.html',
//   styleUrls: ['./cart-list.component.css'],
// })
// export class CartListComponent {}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// import { Component, OnInit } from '@angular/core';
// import { Inject } from '@angular/core';

// @Component({
//   selector: 'avans-nx-workshop-cart-list',
//   templateUrl: './cart-list.component.html',
//   styleUrls: ['./cart-list.component.css'],
// })
// export class CartListComponent implements OnInit {
//   items: any[] = [];

//   constructor(@Inject(CartService) private cartService: CartService) {}

//   ngOnInit(): void {
//     this.items = this.cartService.getCart().items;
//   }

//   addToCart(productId: string) {
//     this.cartService.addToCart(productId);
//   }
// }

import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'avans-nx-workshop-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css'],
})
export class CartListComponent implements OnInit {
  items: ICartItem[] = [];
  totalQuantity = 0;
  totalPrice = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.items = this.cartService.getCart();
  }

  addToCart(productId: string) {
    this.cartService.addToCart(productId);
    this.items = this.cartService.getCart(); // Update the local items array
  }

  removeFromCart(productId: string) {
    this.cartService.removeFromCart(productId);
    this.items = this.cartService.getCart(); // Update the local items array
  }

  updateQuantity(productId: string, quantity: number) {
    this.cartService.updateQuantity(productId, quantity);
    this.items = this.cartService.getCart(); // Update the local items array
  }
}

// You might need to adjust the ICartItem interface based on your backend model
interface ICartItem {
  productId: string;
  quantity: number;
  // Add other product details if needed (e.g., name, price)
}
