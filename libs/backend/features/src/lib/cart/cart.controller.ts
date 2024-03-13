// // cart.controller.ts
// import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
// import { CartService } from './cart.service';
// import { IProduct } from '@avans-nx-workshop/shared/api';

// @Controller('cart')
// export class CartController {
//   constructor(private cartService: CartService) {}

//   @Get('')
// getCartItems(): IProduct[] {
//     return this.cartService.getCartItems();
// }

// @Post(':productId')
// addToCart(@Param('productId') product: IProduct): void {
//     this.cartService.addToCart(product);
// }

// @Delete(':productId')
// removeFromCart(@Param('productId') productId: string): void {
//     this.cartService.removeFromCart(productId);
// }

//   @Delete('')
//   clearCart(): void {
//     this.cartService.clearCart();
//   }
// }


import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CartService } from './cart.service';
import { ICart, ICartItem, IProduct } from '@avans-nx-workshop/shared/api';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
getCart(): ICart {
    return this.cartService.getCart();
}

@Post('/add/:productId')
addToCart(@Param('productId') productId: string, @Body() quantity: number = 1): void {
    this.cartService.addToCart(productId, quantity);
}

@Put('/update/:productId')
updateQuantity(@Param('productId') productId: string, @Body() quantity: number): void {
    this.cartService.updateQuantity(productId, quantity);
}

  @Delete('/:productId')
  removeFromCart(@Param('productId') productId: string): void {
    this.cartService.removeFromCart(productId);
  }

  @Delete()
  clearCart(): void {
    this.cartService.clearCart();
  }
}
