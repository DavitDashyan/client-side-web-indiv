// import { Controller, Get, Logger, Param } from '@nestjs/common';
// import { RecommendationService } from './recommendation.service';
// import { IProduct } from '@avans-nx-workshop/shared/api';

// @Controller('recommendations')
// export class RecommendationController {
//   private readonly logger = new Logger(RecommendationController.name);

//   constructor(private readonly recommendationService: RecommendationService) {}

//   @Get(':userId')
//   async getRecommendations(@Param('userId') userId: string | null): Promise<IProduct[]> {
//     this.logger.log(`Getting recommendations for user with ID: ${userId}`);
//     try {
//       const recommendations = await this.recommendationService.generateRecommendations(userId as string);
//       return recommendations;
//     } catch (error) {
//       this.logger.error(`Error getting recommendations for user with ID: ${userId}`, error);
//       throw error;
//     }
//   }
// }

import { Controller, Get, Param } from '@nestjs/common';
import { IProduct } from '@avans-nx-workshop/shared/api';
import { RecommendationService } from './recommendation.service';

console.log('RECOMMENDATIONS CONTROLLER');

@Controller('recommendations')
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  // @Get(':id')
  // async getRecommendationsForProduct( @Param('id') productId: string): Promise<IProduct[]> {
  //   return await this.recommendationService.generateRecommendations(productId);
  // }

  @Get(':id')
  async getRecommendationsForProduct(@Param('id') _id: string): Promise<IProduct[]> {
    console.log('RECOMMENDATIONS QWERTY ', _id);
    return await this.recommendationService.generateRecommendations(_id);
  }
}