import { Injectable, NotFoundException } from '@nestjs/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICart, ICartItem } from '@avans-nx-workshop/shared/api';
import { ProductService } from '../product/product.service';

import { Cart as CartModel } from './cart.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddToCartDto } from '@avans-nx-workshop/backend/dto';

@Injectable()
export class CartService {
  private cartSubject = new BehaviorSubject<ICart>({
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  });
  cart$: Observable<ICart> = this.cartSubject.asObservable();

  private storageKey = 'my-cart';

  constructor(private productService: ProductService) {}

  getCart(): ICart {
    return this.cartSubject.value;
  }

  // addToCart(productId: string, quantity: number = 1): void {
  //   from(this.productService.getOne(productId))
  //     .pipe(
  //       tap((product) => {
  //         if (!product) {
  //           throw new NotFoundException(
  //             `Product with id ${productId} not found`
  //           );
  //         }
  //       })
  //     )
  //     .subscribe((product) => {
  //       const existingCartItem = this.getCartItem(productId);
  //       if (existingCartItem) {
  //         existingCartItem.quantity += quantity;
  //       } else {
  //         this.cartSubject.next({
  //           ...this.cartSubject.value,
  //           items: [
  //             ...this.cartSubject.value.items,
  //             { productId, quantity, product: product! },
  //           ],
  //           totalQuantity: this.cartSubject.value.totalQuantity + quantity,
  //           totalPrice: this.calculateTotalPrice(),
  //         });
  //       }

  //       this.updateLocalStorage();
  //     });
  // }

  //---------------------

  // async addToCart2(productId: string, quantity: number = 1): Promise<void> {
  //   try {
  //     const product = await this.productService.getOne(productId);

  //     if (!product) {
  //       throw new NotFoundException(`Product with id ${productId} not found`);
  //     }

  //     const existingCartItem = this.getCartItem(productId);
  //     if (existingCartItem) {
  //       existingCartItem.quantity += quantity;
  //     } else {
  //       this.cartSubject.next({
  //         ...this.cartSubject.value,
  //         items: [
  //           ...this.cartSubject.value.items,
  //           { productId, quantity,  },
  //         ],
  //         totalQuantity: this.cartSubject.value.totalQuantity + quantity,
  //         totalPrice: this.calculateTotalPrice(),
  //       });
  //     }

  //     this.updateLocalStorage();
  //   } catch (error) {
  //     // Handle errors (e.g., log or rethrow)
  //     console.error('Error adding to cart:', error);
  //   }
  // }
  private items: any[] = [];

  addToCart(product: any) {
    this.items.push(product);
  }
  getItems() {
    return this.items;
  }

  removeFromCart(productId: string): void {
    const cart = this.getCart();
    const itemIndex = cart.items.findIndex(
      (item) => item.productId === productId
    );
    if (itemIndex >= 0) {
      const updatedItems = [...cart.items].splice(itemIndex, 1);
      this.cartSubject.next({
        ...this.cartSubject.value,
        items: updatedItems,
        totalQuantity: cart.totalQuantity - cart.items[itemIndex].quantity,
        totalPrice: this.calculateTotalPrice(),
      });
      this.updateLocalStorage();
    }
  }

  updateQuantity(productId: string, quantity: number): void {
    quantity = Math.max(quantity, 0); // Ensure positive quantity
    const cart = this.getCart();
    const itemIndex = cart.items.findIndex(
      (item) => item.productId === productId
    );
    if (itemIndex >= 0) {
      const updatedItems = [...cart.items];
      updatedItems[itemIndex].quantity = quantity;
      this.cartSubject.next({
        ...this.cartSubject.value,
        items: updatedItems,
        totalQuantity: this.calculateTotalQuantity(),
        totalPrice: this.calculateTotalPrice(),
      });
      this.updateLocalStorage();
    }
  }

  clearCart(): void {
    this.cartSubject.next({
      items: [],
      totalQuantity: 0,
      totalPrice: 0,
    });
    this.updateLocalStorage();
  }

  private calculateTotalPrice(): number {
    return this.cartSubject.value.items.reduce(
      (sum, item) => sum + (item.price || 0) * item.quantity,
      0
    );
  }

  private calculateTotalQuantity(): number {
    return this.cartSubject.value.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
  }

  public getCartItem(productId: string): ICartItem | undefined {
    return this.cartSubject.value.items.find(
      (item) => item.productId === productId
    );
  }

  private updateLocalStorage(): void {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(this.cartSubject.value)
    );
  }
}
