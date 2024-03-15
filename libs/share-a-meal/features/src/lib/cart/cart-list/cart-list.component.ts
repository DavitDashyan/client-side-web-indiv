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

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// import { Component, OnInit } from '@angular/core';
// import { CartService } from '../cart.service';

// @Component({
//   selector: 'avans-nx-workshop-cart-list',
//   templateUrl: './cart-list.component.html',
//   styleUrls: ['./cart-list.component.css'],
// })
// export class CartListComponent implements OnInit {
//   items: ICartItem[] = [];
//   totalQuantity = 0;
//   totalPrice = 0;

//   constructor(private cartService: CartService) {}

//   ngOnInit(): void {
//     this.items = this.cartService.getCart();
//   }

//   addToCart(productId: string) {
//     this.cartService.addToCart(productId);
//     this.items = this.cartService.getCart(); // Update the local items array
//   }

//   removeFromCart(productId: string) {
//     this.cartService.removeFromCart(productId);
//     this.items = this.cartService.getCart(); // Update the local items array
//   }

//   updateQuantity(productId: string, quantity: number) {
//     this.cartService.updateQuantity(productId, quantity);
//     this.items = this.cartService.getCart(); // Update the local items array
//   }
// }

// // You might need to adjust the ICartItem interface based on your backend model
// interface ICartItem {
//   productId: string;
//   quantity: number;
//   // Add other product details if needed (e.g., name, price)
// }

import { Component, OnInit, inject } from '@angular/core';
import { CartService, ICartItem } from '../cart.service';
//import { ToastrService } from 'ngx-toastr'; // Import Toastr for feedback messages
import { Observable, tap } from 'rxjs';

import { ProductDetailComponent } from '../../product/product-detail/product-detail.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'avans-nx-workshop-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css'],
})
export class CartListComponent implements OnInit {
  items: ICartItem[] = [];
  totalQuantity = 0;
  totalPrice = 0;
  productName = '';
  productPrice = 0;
  cartService = inject(CartService);

  // constructor(
  //   private cartService: CartService,
  //   //private toastr: ToastrService
  // ) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  addToCart(productId: any): void {
    this.cartService.addToCart(productId);
    console.log(productId, 'Product Id');
    console.log(this.productName, 'Product Name 123');
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.items = this.cartService.getCart();
    this.calculateTotal();
  }

  removeFromCart2(productId: string): void {
    const index = this.items.findIndex((item) => item.productId === productId);
    if (index >= 0) {
      this.items.splice(index, 1); // Remove the item from the local component array
      this.calculateTotal(); // Recalculate total quantity and price
      this.cartService.removeFromCart(productId); // Call the service to remove from storage
    }
  }

  removeFromCart(productId: string): void {
    this.cartService.removeFromCart(productId);
    this.loadCartItems(); // Reload cart items after removal
  }



  getTotal() {
    return this.items.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
  }

  // deleteFromCart(item){
  //   this.cartService.delete(item);
  //   this.loadCartItems();
  // }

  calculateTotal(): void {
    this.totalQuantity = this.items.reduce(
      (total, item) => total + item.quantity,
      0
    );
    this.totalPrice = this.items.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  }

  // removeFromCart(item: ICartItem): Observable<void> {
  //   return this.cartService.removeFromCart(item.productId).pipe(
  //     tap(() => {
  //       this.toastr.info(`Removed ${item.productId} from cart`);
  //       this.loadCartItems();
  //     })
  //   );
  // }

  // updateQty(event: any, item: ICartItem): void {
  //   const newQty = event.target.value;  // Get the new quantity from the input field
  //   if (newQty < 1) {
  //     this.toastr.error('Quantity must be at least 1');
  //     return;
  //   } else if (newQty > 10) {
  //     this.toastr.warning('You can only order up to 10 items');
  //     return;
  //   }
  //   this.cartService.updateQty(item.productId, newQty).subscribe(() => {
  //     item.quantity = newQty;  // Update the local quantity
  //     this.calculateTotal();  // Recalculate the total quantity and price
  //   });
  // }

  // removeFromCart2(productId: string): void {
  //   this.cartService.removeFromCart(productId).subscribe(() => {
  //     this.loadCartItems();
  //     this.toastr.success('Item removed from cart!');
  //   });
  // }

  // updateQuantity(productId: string, quantity: number): void {
  //   this.cartService.updateQuantity(productId, quantity).subscribe(() => {
  //     this.loadCartItems();
  //     this.toastr.success('Quantity updated!');
  //   });
  // }

  // private loadCartItems(): void {
  //   this.cartService.getCart().subscribe((cart) => {
  //     this.items = cart.items;
  //     this.totalQuantity = cart.totalQuantity;
  //     this.totalPrice = cart.totalPrice;
  //   });
  // }
}

// addToCart(productId: string): void {
//   this.cartService.addToCart(productId);
//   this.loadCartItems();
//   this.toastr.success('Item added to cart!');
// }
