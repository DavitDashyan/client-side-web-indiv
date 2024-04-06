import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


// import { Module } from '@nestjs/common';
// import { Neo4jModule } from 'nest-neo4j/dist';
// // import { Neo4jBackendModule } from '@avans-nx-sportclub/backend/neo4j';
 
// @Module({
//   imports: [
//     Neo4jModule.forRoot({
//       scheme: 'bolt',
//       host: 'localhost',
//       port: 7687,
//       username: 'neo4j',
//       password: 'Ammar-1993',
//     }),
//     // Neo4jBackendModule,
//   ],
//   controllers: [],
//   providers: [],
// })
// export class AppModule {}