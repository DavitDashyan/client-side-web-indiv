import { Module } from '@nestjs/common';
import{ MealModule} from '@avans-nx-workshop/backend/features';
import { RouterModule, Routes } from '@angular/router';

import { AppController } from './app.controller';
import { AppService } from './app.service';



@Module({
  imports: [MealModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

