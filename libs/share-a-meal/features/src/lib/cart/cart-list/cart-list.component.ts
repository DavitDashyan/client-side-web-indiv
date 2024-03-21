// // import { Component, OnInit, inject } from '@angular/core';
// // import { CartService } from '../cart.service';
// // import { ICartItem } from '@avans-nx-workshop/shared/api';
// // //import { ToastrService } from 'ngx-toastr'; // Import Toastr for feedback messages
// // import { Observable, tap } from 'rxjs';

// // import { ProductDetailComponent } from '../../product/product-detail/product-detail.component';
// // import { CommonModule } from '@angular/common';

// // @Component({
// //   selector: 'avans-nx-workshop-cart-list',
// //   templateUrl: './cart-list.component.html',
// //   styleUrls: ['./cart-list.component.css'],
// // })
// // export class CartListComponent implements OnInit {
// //   items: ICartItem[] = [];
// //   totalQuantity = 0;
// //   cart = {} as ICartItem;
// //   totalPrice = 0;
// //   productName = '';
// //   productPrice = 0;
// //   productImageUrl = '';
// //   cartService = inject(CartService);

// //   // constructor(
// //   //   private cartService: CartService,
// //   //   //private toastr: ToastrService
// //   // ) {}

// //   ngOnInit(): void {
// //     this.loadCartItems();
// //   }

// //   addToCart(productId: any): void {
// //     this.cartService.addToCart(productId);
// //     console.log(productId, 'Product Id');
// //     console.log(this.productName, 'Product Name 123');
// //     this.loadCartItems();
// //   }

// //   loadCartItems(): void {
// //     this.items = this.cartService.getCart();
// //     console.log(this.items, 'Items');

// //     this.calculateTotal();
// //   }

// //   removeFromCart2(productId: string): void {
// //     const index = this.items.findIndex((item) => item.productId === productId);
// //     if (index >= 0) {
// //       this.items.splice(index, 1); // Remove the item from the local component array
// //       this.calculateTotal(); // Recalculate total quantity and price
// //       this.cartService.removeFromCart(productId); // Call the service to remove from storage
// //     }
// //   }

// //   removeFromCart(productId: string): void {
// //     this.cartService.removeFromCart(productId);
// //     this.loadCartItems(); // Reload cart items after removal
// //   }

// //   getTotal() {
// //     return this.items.reduce((acc, item) => {
// //       return acc + item.price * item.quantity;
// //     }, 0);
// //   }

// //   // deleteFromCart(item){
// //   //   this.cartService.delete(item);
// //   //   this.loadCartItems();
// //   // }

// //   calculateTotal(): void {
// //     this.totalQuantity = this.items.reduce(
// //       (total, item) => total + item.quantity,
// //       0
// //     );
// //     this.totalPrice = this.items.reduce(
// //       (total, item) => total + item.quantity * item.price,
// //       0
// //     );
// //   }
// // }

// //-------------------------------------------------------------------------------------

// import { Component, OnInit } from '@angular/core';
// import { CartService } from '../cart.service';
// import { ICartItem, IUser } from '@avans-nx-workshop/shared/api';
// import { Inject } from '@angular/core';
// import { AuthService } from '../../auth/auth.service';
// import { take } from 'rxjs';

// @Component({
//   selector: 'avans-nx-workshop-cart-list',
//   templateUrl: './cart-list.component.html',
//   styleUrls: ['./cart-list.component.css'],
// })
// export class CartListComponent implements OnInit {
//   items: ICartItem[] = [];
//   userId: string = '';
 
//   constructor(
//     private cartService: CartService,
//     private authService: AuthService
//   ) {}

//   // ngOnInit(): void {
//   //   this.loadCartItems();
//   // }

//   ngOnInit(): void {
//     this.authService.currentUser$.pipe(take(1)).subscribe((user) => {
//       if (user) {
//         this.userId = user._id;
//         this.loadCartItems(); // Call loadCartItems after userId is set
//       }
//     });
//   }

//   addToCart(productId: any): void {
//     const user: IUser = {
//       _id: this.userId || '', 
//       name: '',
//       address: '',
//       number: 0,
//       email: '',
//       password: '',
//       bday: new Date(), 
//     }; 
//     console.log('User ID AA:', user._id);
//     console.log('User productId AA:', productId);
//     this.cartService.addToCart(user._id, productId); 
//     this.loadCartItems();
//   }

//   // loadCartItems(): void {
//   //   console.log('User ID+cart.item:', this.userId, this.items);
//   //   const cart = this.cartService.getCart(this.userId);
//   //   if (cart) {
//   //     this.items = cart.items;
//   //     //this.calculateTotal();
//   //   } else {
//   //     this.items = [];
//   //     this.totalQuantity = 0;
//   //     this.totalPrice = 0;
//   //   }
//   // }

//   async loadCartItems(): Promise<void> {
//     console.log('User ID BB:', this.userId);
//     console.log('User item BB:', this.items);
//     const cart = await this.cartService.getCart(this.userId);
//     if (cart && cart.items) {
//       this.items = cart.items;
//       // this.calculateTotal();
//     }
//   }

//   // Declare the userId property

//   // constructor(
//   //   private cartService: CartService,
//   //   @Inject(AuthService) private authService: AuthService
//   // ) {}

//   // ngOnInit(): void {
//   //   this.authService.currentUser$.subscribe((user) => {
//   //     if (user) {
//   //       this.userId = user.id;
//   //       this.loadCartItems();
//   //     }
//   //   });
//   // }

//   // loadCartItems(): void {
//   //   if (this.userId) {
//   //     this.items = this.cartService.getCart(this.userId);
//   //     this.calculateTotal();
//   //   }
//   // }

//   removeFromCart(productId: string): void {
//     this.cartService.removeFromCart(this.userId, productId);
//     this.loadCartItems();
//   }

//   getTotal() {
//     return this.items.reduce(
//       (acc, item) => acc + item.price * item.quantity,
//       0
//     );
//   }

//   // calculateTotal(): void {
//   //   let totalQuantity = 0;
//   //   let totalPrice = 0;

//   //   for (const item of this.items) {
//   //     if (item.quantity && item.price) {
//   //       totalQuantity += item.quantity;
//   //       totalPrice += item.quantity * item.price;
//   //     }
//   //   }

//   //   this.totalQuantity = totalQuantity;
//   //   this.totalPrice = totalPrice;
//   // }
// }
