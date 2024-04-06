import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
  production: true,
  dataApiUrl: 'https://demonodeapp42.azurewebsites.net',
  mongo:
    'mongodb+srv://davit:<password>@cluster0.w3n5jzg.mongodb.net/?retryWrites=true&w=majority',
  neo4j: {
    schema: 'neo4j',
    host: 'localhost',
    port: 7687,
    username: 'neo4j',
    password: 'Markt123!',
    database: 'neo4j',
  },
};
