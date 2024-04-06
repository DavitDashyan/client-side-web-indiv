import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
  production: false,
  dataApiUrl: 'http://localhost:3000',
  //   mongo: 'mongodb+srv://davit:<password>@cluster0.w3n5jzg.mongodb.net/?retryWrites=true&w=majority',
  mongo:
    'mongodb+srv://davit:chDNvn5u7EpUeNo6@cluster0.w3n5jzg.mongodb.net/?retryWrites=true&w=majority',
  neo4j: {
    schema: 'neo4j',
    host: 'localhost',
    port: 7687,
    username: 'neo4j',
    password: 'Mark123!',
    database: 'neo4j',
  },
};
