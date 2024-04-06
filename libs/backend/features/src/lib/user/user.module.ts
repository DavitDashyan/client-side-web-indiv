import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.shema';
import { RecommendationService } from '../recommendation/recommendation.service'; // Import the missing RecommendationService class

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, RecommendationService], // Add RecommendationService to the providers array
  exports: [UserService],
})
export class UserModule {}
