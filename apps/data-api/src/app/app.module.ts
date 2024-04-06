import { AppController } from './app.controller';

import { Module } from '@nestjs/common';

import { AppService } from './app.service';

import { environment } from '@avans-nx-workshop/shared/util-env';

import {
  ProductModule,
  UserModule,
  ShopModule,
  
  // CartModule,
} from '@avans-nx-workshop/backend/features';
import { MongooseModule } from '@nestjs/mongoose';
import { RecommendationModule } from '@avans-nx-workshop/backend/features';

@Module({
  imports: [
    MongooseModule.forRoot(environment.mongo, {
      dbName: 'clientSideWebProject',
    }),
    ProductModule,
    UserModule,
    ShopModule,
    RecommendationModule,
    // CartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
