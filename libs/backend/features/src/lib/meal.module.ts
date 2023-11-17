import { Module } from '@nestjs/common';
import { MealController } from './meal.controller';
import { MealService } from './meal.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
  controllers: [MealController, UserController],
  providers: [MealService,UserService],
  exports: [MealService,UserService],
})
export class MealModule {}
