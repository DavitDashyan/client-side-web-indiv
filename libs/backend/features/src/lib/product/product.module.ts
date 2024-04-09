import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';

import { Product, ProductSchema } from './product.schema';
import { ShopService } from '../shop/shop.service';
import { Shop, ShopSchema } from '../shop/shop.schema';
import { User, UserSchema } from '../user/user.shema';
import { RecommendationService } from '../recommendation/recommendation.service';

//represents a collection in the MongoDB database, and it allows us to perform CRUD operations on the data

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Shop.name, schema: ShopSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService, ShopService, RecommendationService],
  exports: [ProductService],
})
export class ProductModule {}

// doos waar je alles wat bij elkaar hoort voor een specifiek stuk van je app in stopt,
// zoals alle spullen voor de 'product' pagina. Zo'n doos maakt je app netjes en georganiseerd.
