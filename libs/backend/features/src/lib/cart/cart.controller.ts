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

// import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
// import { CartService } from './cart.service';
// import { ICart, ICartItem, IProduct } from '@avans-nx-workshop/shared/api';

// @Controller('cart')
// export class CartController {
//   constructor(private cartService: CartService) {}

//   @Get()
// getCart(): ICart {
//     return this.cartService.getCart();
// }

// @Post('/add/:productId')
// addToCart(@Param('productId') productId: string, @Body() quantity: number = 1): void {
//     this.cartService.addToCart(productId, quantity);
// }

// @Put('/update/:productId')
// updateQuantity(@Param('productId') productId: string, @Body() quantity: number): void {
//     this.cartService.updateQuantity(productId, quantity);
// }

//   @Delete('/:productId')
//   removeFromCart(@Param('productId') productId: string): void {
//     this.cartService.removeFromCart(productId);
//   }

//   @Delete()
//   clearCart(): void {
//     this.cartService.clearCart();
//   }
// }

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { ICart, ICartItem, IProduct } from '@avans-nx-workshop/shared/api';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  async getCart(): Promise<ICart> {
    try {
      const cart = await this.cartService.getCart();
      return cart; // Assuming getCart returns ICart
    } catch (error) {
      throw new HttpException(
        'Error retrieving cart',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  @Get('/getOne/:productId') // <-- Added `getOne` endpoint
  async getOne(
    @Param('productId') productId: string
  ): Promise<ICartItem | undefined> {
    try {
      const cartItem = this.cartService.getCartItem(productId);
      return cartItem;
    } catch (error) {
      throw new HttpException(
        'Error retrieving cart item',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Post('/add/:productId')
  async addToCart(
    @Param('productId') productId: string,
    @Body() quantity: number = 1
  ): Promise<void> {
    try {
      await this.cartService.addToCart(productId);
    } catch (error) {
      throw new HttpException('Error adding to cart', HttpStatus.BAD_REQUEST); // Adjust code based on error type
    }
  }

  @Put('/update/:productId')
  async updateQuantity(
    @Param('productId') productId: string,
    @Body() quantity: number
  ): Promise<void> {
    try {
      await this.cartService.updateQuantity(productId, quantity);
    } catch (error) {
      throw new HttpException(
        'Error updating quantity',
        HttpStatus.BAD_REQUEST
      ); // Adjust code based on error type
    }
  }

  @Delete('/:productId')
  async removeFromCart(@Param('productId') productId: string): Promise<void> {
    try {
      await this.cartService.removeFromCart(productId);
    } catch (error) {
      throw new HttpException(
        'Error removing from cart',
        HttpStatus.BAD_REQUEST
      ); // Adjust code based on error type
    }
  }
  @Delete()
  async clearCart(): Promise<void> {
    try {
      await this.cartService.clearCart();
    } catch (error) {
      throw new HttpException(
        'Error clearing cart',
        HttpStatus.INTERNAL_SERVER_ERROR
      ); // Adjust code based on error type
    }
  }
}
