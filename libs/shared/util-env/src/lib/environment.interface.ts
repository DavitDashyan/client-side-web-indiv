export interface IEnvironment {
  production: boolean;
  dataApiUrl: string;
  mongo: string;
  neo4j: {
    schema: string;
    host: string;
    port: number;
    password: string;
    username: string;
    database: string;
  };
}
