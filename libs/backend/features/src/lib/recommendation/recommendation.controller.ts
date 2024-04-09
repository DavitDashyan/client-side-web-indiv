import { Controller, Get, Param } from '@nestjs/common';
import { IProduct } from '@avans-nx-workshop/shared/api';
import { RecommendationService } from './recommendation.service';

console.log('RECOMMENDATIONS CONTROLLER');
//ontvangen alle HTTP verzoeken en sturen van response

@Controller('recommendations')
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  @Get(':id')
  async getRecommendationsForProduct(@Param('id') _id: string): Promise<IProduct[]> {
    console.log('RECOMMENDATIONS QWERTY ', _id);
    return await this.recommendationService.generateRecommendations(_id);
  }
}