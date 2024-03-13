import { Injectable } from '@angular/core';

export interface ICartItem {
  productId: string;
  quantity: number;
  // Add other product details if needed (e.g., name, price)
}

@Injectable({
  providedIn: 'root'
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

  addToCart(productId: string, quantity: number = 1): void {
    const existingItem = this.cartItems.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({ productId, quantity });
    }
    this.updateCartState();
  }

  removeFromCart(productId: string): void {
    const itemIndex = this.cartItems.findIndex(item => item.productId === productId);
    if (itemIndex >= 0) {
      this.cartItems.splice(itemIndex, 1);
      this.updateCartState();
    }
  }

  updateQuantity(productId: string, quantity: number): void {
    quantity = Math.max(quantity, 0); // Ensure positive quantity
    const itemIndex = this.cartItems.findIndex(item => item.productId === productId);
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
    const totalQuantity = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    //const totalPrice = this.cartItems.reduce((sum, item) => sum + (/* product price logic */) * item.quantity, 0);
    
    // Update your component state or store with the updated cart and totals
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }
}
