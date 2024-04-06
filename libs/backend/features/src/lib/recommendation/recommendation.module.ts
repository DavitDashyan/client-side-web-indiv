import { Module } from '@nestjs/common';
import { Neo4jModule, Neo4jScheme } from 'nest-neo4j/dist';
import { RecommendationService } from './recommendation.service';
// import { RecommendationController } from './recommendation.controller';
import { environment } from '@avans-nx-workshop/shared/util-env';
import { RecommendationController } from './recommendation.controller';

@Module({
  controllers: [RecommendationController],
  providers: [RecommendationService],
  imports: [
    Neo4jModule.forRoot({
      scheme: environment.neo4j.schema as Neo4jScheme,
      host: environment.neo4j.host,
      port: environment.neo4j.password,
      username: environment.neo4j.username,
      password: environment.neo4j.password,
    }),
  ],
})
export class RecommendationModule {}
