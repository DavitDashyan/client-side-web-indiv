// import { Injectable } from '@angular/core';
// import {
//   ICart,
//   ICartItem,
//   IProduct,
//   IUser,
// } from '@avans-nx-workshop/shared/api';

// @Injectable({
//   providedIn: 'root',
// })
// export class CartService {
//   constructor() {}

//   private getUserCartKey(userId: string): string {
//     return `cart_${userId}`;
//   }

//   //   private getCart(userId: string): ICartItem[] {
//   //     const storedCart = localStorage.getItem(this.getUserCartKey(userId));
//   //     return storedCart ? JSON.parse(storedCart) : [];
//   //   }

//   private cartItems: ICartItem[] = [];

//   getCart(userId: string): ICartItem[] {
//     return this.cartItems.filter((item) => userId);
//   }

//   private updateCart(userId: string, cartItems: ICartItem[]): void {
//     localStorage.setItem(
//       this.getUserCartKey(userId),
//       JSON.stringify(cartItems)
//     );
//   }

//   addToCart(userId: IUser, product: IProduct): void {
//     const userCart = this.getCart(userId._id as string);
//     const existingItem = userCart.find((item) => item.productId === product.id);
//     if (existingItem) {
//       existingItem.quantity++;
//     } else {
//       userCart.push({
//         _id: '', // Add _id property
//         productId: product.id,
//         quantity: 1,
//         nameProduct: product.nameProduct,
//         price: product.price,
//         productImageUrl: product.productImageUrl,
//       });
//     }
//     this.updateCart(userId._id as string, userCart);
//   }

//   removeFromCart(userId: string, productId: string): void {
//     let userCart = this.getCart(userId);
//     const itemIndex = userCart.findIndex(
//       (item) => item.productId === productId
//     );
//     if (itemIndex >= 0) {
//       userCart.splice(itemIndex, 1);
//       this.updateCart(userId, userCart);
//     }
//   }

//   getCartItems(userId: string): ICartItem[] {
//     console.log(' userID', userId, 'User Id');
//     return this.getCart(userId);
//   }

//   clearCart(userId: string): void {
//     localStorage.removeItem(this.getUserCartKey(userId));
//   }
// }

import { Injectable } from '@angular/core';
import { ICart, ICartItem, IProduct } from '@avans-nx-workshop/shared/api';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}

  private getUserCartKey(userId: string): string {
    return `cart_${userId}`;
  }

  private getStoredCart(userId: string): ICart | null {
    const storedCart = localStorage.getItem(this.getUserCartKey(userId));
    return storedCart ? JSON.parse(storedCart) : null;
  }

  private updateCart(userId: string, cart: ICart): void {
    localStorage.setItem(this.getUserCartKey(userId), JSON.stringify(cart));
  }

  getCart(userId: string): ICart | null {
    console.log(' userID', userId, 'User Id');
    return this.getStoredCart(userId);
  }

  // addToCart(userId: string, product: IProduct): void {
  //   const userCart = this.getStoredCart(userId);
  //   if (userCart) {
  //     const existingItem = userCart.items.find((item) => item.productId === product.id);
  //     if (existingItem) {
  //       existingItem.quantity++;
  //     } else {
  //       userCart.items.push({
  //         _id: '',
  //         productId: product.id,
  //         quantity: 1,
  //         nameProduct: product.nameProduct,
  //         price: product.price,
  //         productImageUrl: product.productImageUrl,
  //       });
  //     }
  //     this.updateCart(userId, userCart);
  //   }
  // }

  // -=-=-=-=-=-=-=-
  // addToCart(userId: string, product: IProduct): void {
  //   console.log('User Id cart.service.ts:', userId);
  //   console.log('Product cart.service.ts:', product);
  //   const userCart = this.getStoredCart(userId);
  //   // if (userCart && userCart.items) {
  //   //   const existingItem = userCart.items.find(
  //   //     (item) => item.productId === product.id
  //   //   );
  //     // if (existingItem) {
  //     //   existingItem.quantity++;
  //     // } else {
  //     if (userCart) {
  //       userCart.items.push({
  //         _id: '',
  //         productId: product.id,
  //         quantity: 1,
  //         nameProduct: product.nameProduct,
  //         price: product.price,
  //         productImageUrl: product.productImageUrl,
  //       });
  //       console.log('User Cart + userId AAAAA:', userCart, userId);
  //       this.updateCart(userId, userCart);
  //     }
  //   }

  addToCart(userId: string, product: IProduct): void {
    console.log('User Id cart.service.ts:', userId);
    console.log('Product cart.service.ts:', product);
    const userCart = this.getStoredCart(userId);
    if (userCart) {
      if (!Array.isArray(userCart.items)) {
        userCart.items = []; // Als userCart.items geen array is, maak het leeg
      }
      userCart.items.push({
        _id: '',
        productId: product.id,
        quantity: 1,
        nameProduct: product.nameProduct,
        price: product.price,
        productImageUrl: product.productImageUrl,
      });
      console.log('User Cart + userId AAAAA:', userCart, userId);
      this.updateCart(userId, userCart);
    }
  }

  removeFromCart(userId: string, productId: string): void {
    const userCart = this.getStoredCart(userId);
    if (userCart) {
      const itemIndex = userCart.items.findIndex(
        (item) => item.productId === productId
      );
      if (itemIndex >= 0) {
        userCart.items.splice(itemIndex, 1);
        this.updateCart(userId, userCart);
      }
    }
  }

  clearCart(userId: string): void {
    localStorage.removeItem(this.getUserCartKey(userId));
  }
}
