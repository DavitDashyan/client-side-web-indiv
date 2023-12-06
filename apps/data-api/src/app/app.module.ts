import { Module } from '@nestjs/common';
import{ MealModule} from '@avans-nx-workshop/backend/features';

@Module({
  imports: [MealModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}

