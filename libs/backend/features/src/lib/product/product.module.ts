import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';

import { Product, ProductSchema } from './product.schema';
import { ShopService } from '../shop/shop.service';
import { Shop, ShopSchema } from '../shop/shop.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Shop.name, schema: ShopSchema },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService, ShopService],
  exports: [ProductService],
})
export class ProductModule {}