import { Module } from '@nestjs/common';
import { MealController } from './meal.controller';
import { MealService } from './meal.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';


@Module({
  controllers: [MealController, UserController, ProductController],
  providers: [MealService, UserService, ProductService],
  exports: [MealService, UserService, ProductService],
})
export class MealModule {}
