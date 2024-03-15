import { Injectable } from '@angular/core';
import { IProduct } from '@avans-nx-workshop/shared/api';

export interface ICartItem {
  productId: string;
  quantity: number;
  nameProduct: string;
  price: number;
  productImageUrl: string;
  // Add other product details if needed (e.g., name, price)
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: ICartItem[] = [];

  constructor() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cartItems = JSON.parse(storedCart);
    }
  }

  getCart(): ICartItem[] {
    return this.cartItems.slice(); // Return a copy to avoid mutation
  }
  // addToCart(product: IProduct): void {
  //     this.cartItems.push({ productId: product.id, quantity: 1 });
  //   }

  getItems() {
    return this.cartItems;
  }
incrementQuantity(id: string) {
    let item = this.cartItems.find((x) => x.productId !== id);
    if (item) {
        item.quantity++;
    }
}

decrementQuantity(id: string) {
    let item = this.cartItems.find((x) => x.productId !== id);
    if (item) {
        item.quantity--;
    }
}
  getTotal() {
    return this.cartItems.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
  }

  //onderste code is goed, met tutorial bezig
  //   addToCart(product: IProduct): void {
  //     this.cartItems.push({ productId: product.id, quantity: 1 });
  //     this.updateCartState();
  //   }

  addToCart(product: IProduct): void {
    const existingItem = this.cartItems.find(
      (item) => item.productId === product.id
    );
    // if (existingItem) {
    //   existingItem.quantity++;
    //   console.log(product.id, 'Product Id');
    // } else {
    console.log(product.id, 'Product Id');
    console.log(product.nameProduct, 'Product Name');
    this.cartItems.push({
      productId: product.id,
      quantity: 1,
      nameProduct: product.nameProduct,
      price: product.price,
      productImageUrl: product.productImageUrl,
    });

    this.updateCartState();
  }

  removeFromCart(productId: string): void {
    const itemIndex = this.cartItems.findIndex(
      (item) => item.productId === productId
    );
    if (itemIndex >= 0) {
      this.cartItems.splice(itemIndex, 1);
      this.updateCartState();
    }
  }

  updateQuantity(productId: string, quantity: number): void {
    quantity = Math.max(quantity, 0); // Ensure positive quantity
    const itemIndex = this.cartItems.findIndex(
      (item) => item.productId === productId
    );
    if (itemIndex >= 0) {
      this.cartItems[itemIndex].quantity = quantity;
      this.updateCartState();
    }
  }

  clearCart(): void {
    this.cartItems = [];
    this.updateCartState();
  }

  private updateCartState(): void {
    const totalQuantity = this.cartItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    //const totalPrice = this.cartItems.reduce((sum, item) => sum + (/* product price logic */) * item.quantity, 0);

    // Update your component state or store with the updated cart and totals
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }
}
