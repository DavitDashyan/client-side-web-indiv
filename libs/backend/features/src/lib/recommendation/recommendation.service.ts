// import { Injectable, Logger } from "@nestjs/common";
// import { Neo4jService } from "nest-neo4j/dist";
// import { IUser, ICartItem, IProduct } from '@avans-nx-workshop/shared/api';

// @Injectable()
// export class RecommendationService {
//   private readonly logger: Logger = new Logger(RecommendationService.name);

//   constructor(private readonly neo4jService: Neo4jService) {}

//   async createOrUpdateUser(user: IUser) {
//     this.logger.log(`Creating user`);

//     const result = await this.neo4jService.write(`
//       MERGE (u:User { _id: $id })
//       ON CREATE SET u.name = $name
//       ON MATCH SET u.name = $name
//       RETURN u
//     `, {
//       id: user._id?.toString(),
//       name: user.name,
//     });

//     return result;
//   }

//   async addProductToUserCart(userId: string, productId: string) {
//     this.logger.log(`Adding product to user cart`);

//     const result = await this.neo4jService.write(`
//       MATCH (u:User { _id: $userId }), (p:Product { _id: $productId })
//       MERGE (u)-[:ADDED_TO_CART]->(p)
//       RETURN u, p
//     `, {
//       userId,
//       productId,
//     });

//     return result;
//   }

//   async generateRecommendations(userId: string): Promise<IProduct[]> {
//     this.logger.log(`Generating recommendations for user with ID: ${userId}`);

//     const result = await this.neo4jService.read(`
//       MATCH (u:User { _id: $userId })-[:ADDED_TO_CART]->(p1:Product),
//             (p1)<-[:ADDED_TO_CART]-(u2:User)-[:ADDED_TO_CART]->(p2:Product)
//       WHERE NOT (u)-[:ADDED_TO_CART]->(p2)
//       RETURN p2
//     `, {
//       userId,
//     });

//     return result.records.map(record => record.get('p2').properties as IProduct);
//   }
// }

import { Injectable, Logger } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';
import { IUser, ICartItem, IProduct } from '@avans-nx-workshop/shared/api';

@Injectable()
export class RecommendationService {
  private readonly logger: Logger = new Logger(RecommendationService.name);

  constructor(private readonly neo4jService: Neo4jService) {}

  async createOrUpdateUser(user: IUser) {
    this.logger.log(`Creating user`);

    const result = await this.neo4jService.write(
      `
      MERGE (u:User { _id: $id })
      ON CREATE SET u.name = $name
      ON MATCH SET u.name = $name
      RETURN u
    `,
      {
        id: user._id?.toString(),
        name: user.name,
      }
    );
    console.log('resultNEO', result);
    console.log('NEO', user._id?.toString(), user.name);

    return result;
  }

  async deleteUserNeo(userId: string) {
    this.logger.log(`Deleting user with ID: ${userId}`);

    const result = await this.neo4jService.write(
      `
      MATCH (u:User { _id: $userId })
      DETACH DELETE u
    `,
      {
        userId,
      }
    );

    return result;
  }

  async addProductToUserCart(userId: string, productId: string) {
    this.logger.log(`Adding product to user cart`);

    const result = await this.neo4jService.write(
      `
      MATCH (u:User { _id: $userId }), (p:Product { _id: $productId })
      MERGE (u)-[:ADDED_TO_CART]->(p)
      RETURN u, p
    `,
      {
        userId,
        productId,
      }
    );

    return result;
  }

  async deleteProductFromUserCart(userId: string, productId: string) {
    this.logger.log(`Deleting product ${productId} from user ${userId}'s cart`);

    const result = await this.neo4jService.write(
      `
      MATCH (u:User { _id: $userId })-[r:ADDED_TO_CART]->(p:Product { _id: $productId })
      DELETE r
    `,
      {
        userId,
        productId,
      }
    );

    return result;
  }

  async createOrUpdateProduct(product: IProduct) {
    this.logger.log(`Creating or updating product`);

    const result = await this.neo4jService.write(
      `
      MERGE (p:Product { _id: $id })
      ON CREATE SET p.nameProduct = $nameProduct, p.description = $description, p.price = $price, p.condition = $condition
      ON MATCH SET p.nameProduct = $nameProduct, p.description = $description, p.price = $price, p.condition = $condition
      RETURN p
    `,
      {
        id: product._id?.toString(),
        nameProduct: product.nameProduct,
        description: product.description,
        price: product.price,
        condition: product.condition,
      }
    );

    return result;
  }

  async deleteProductNeo(productId: string) {
    this.logger.log(`Deleting product with ID: ${productId}`);

    const result = await this.neo4jService.write(
      `
      MATCH (p:Product { _id: $productId })
      DETACH DELETE p
    `,
      {
        productId,
      }
    );

    return result;
  }

  async generateRecommendations(productId: string): Promise<IProduct[]> {
    this.logger.log(
      `Generating recommendations for user with ID: ${productId}`
    );

    const result = await this.neo4jService.read(
      `
      MATCH (u:User)-[:ADDED_TO_CART]->(:Product { _id: $productId })
      WITH COLLECT(u) AS users
      MATCH (u)-[:ADDED_TO_CART]->(p1:Product { _id: $productId })
      MATCH (u)-[:ADDED_TO_CART]->(otherProduct:Product)
      WHERE u IN users AND otherProduct <> p1
      RETURN otherProduct, COUNT(*) AS count
      ORDER BY count DESC
      LIMIT 5
    `,
      {
        productId,
      }
    );

    return result.records.map(
      (record) => record.get('otherProduct').properties as IProduct
    );
  }
}
