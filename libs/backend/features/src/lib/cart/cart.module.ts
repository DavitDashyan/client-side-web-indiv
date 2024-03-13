import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from './cart.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cart.name, schema: CartSchema },
      // { name: Shop.name, schema: ShopSchema },
    ]),
  ],
  controllers: [CartController],
  providers: [CartService], //ShopService
  exports: [CartService],
})
export class CartModule {}
