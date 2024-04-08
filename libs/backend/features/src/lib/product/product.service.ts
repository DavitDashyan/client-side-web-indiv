import { Injectable, NotFoundException } from '@nestjs/common';
import { ICartItem, IProduct, IUser } from '@avans-nx-workshop/shared/api';
import { Logger } from '@nestjs/common';
import { Product, ProductDocument } from './product.schema';
import { ShopService } from '../shop/shop.service';
import { Product as ProductModel } from './product.schema';
import { User as UserModel, UserDocument } from '../user/user.shema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RecommendationService } from '../recommendation/recommendation.service';
import {
  CreateProductDto,
  UpdateProductDto,
} from '@avans-nx-workshop/backend/dto';

@Injectable()
export class ProductService {
  // TAG = 'ProductService';
  // private product$ = new BehaviorSubject<IProduct[]>([ testdata ]);

  //LOGICA VOOR PRODUCTEN en Cart

  private readonly logger: Logger = new Logger(ProductService.name);

  constructor(
    @InjectModel(ProductModel.name)
    private productModel: Model<ProductDocument>,

    @InjectModel(UserModel.name) private userModel: Model<UserDocument>,
    private readonly recommendationService: RecommendationService
  ) {}

  async getAll(): Promise<IProduct[]> {
    const items = await this.productModel.find().populate('shopId'); // haal ook de shopid op
    return items;
  }

  async getOne(id: string): Promise<IProduct | null> {
    this.logger.log(`finding product with id ${id}`);

    Logger.log('Get one');
    return await this.productModel.findOne({ _id: id }).exec();
  }

  //zoeken voor de api, niet gebruikt in de ui
  async getAllProductsBySearchTerm(searchTerm: string) {
    return (await this.getAll()).filter((product) =>
      product.nameProduct.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  async createProduct(productDto: CreateProductDto): Promise<IProduct> {
    const { _id, ...product } = productDto;

    const productData = {
      ...product,
    };

    const createdProduct = await this.productModel.create(productData); //product aanamken op basisi van de productData

    //in neo4j de create doen
    await this.recommendationService.createOrUpdateProduct(createdProduct);

    return createdProduct;
  }

  async update(
    productId: string,
    updateProductDto: UpdateProductDto
  ): Promise<IProduct> {
    const existingProduct = await this.productModel.findById(productId).exec();

    if (!existingProduct) {
      throw new NotFoundException(`Product with id ${productId} not found`);
    }

    // Update product properties
    Object.assign(existingProduct, updateProductDto);

    // Save the updated product
    const updatedProduct = await existingProduct.save();

    //de update doen in neo4j
    await this.recommendationService.createOrUpdateProduct(updatedProduct);

    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<void> {
    this.logger.log(`Deleting Product with id ${id}`);
    const deletedItem = await this.productModel.findByIdAndDelete(id).exec();

    if (!deletedItem) {
      this.logger.debug('Product not found for deletion');
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    await this.recommendationService.deleteProductNeo(id);

    this.logger.log(`Product deleted successfully`);
  }

  // async addProduct(userId: string, productId: IProduct): Promise<IUser> {
  //   const user = await this.userModel.findById(userId).exec();

  //   if (!user) {
  //     throw new NotFoundException(`User with id ${userId} not found`);
  //   }
  //   const newProduct: ICartItem = {
  //     _id: '',
  //     productId: String(productId),
  //     quantity: 1,
  //     nameProduct: '',
  //     price: 0,
  //     productImageUrl: '',
  //   };
  //   console.log('productId newProduct:', newProduct.productId);

  //   user.cart.push(newProduct);
  //   console.log('user.cart QAQ:', user.cart);
  //   console.log('newProduct:', newProduct);

  //   const updatedUser = await user.save();

  //   return updatedUser;
  // }

  //uit cart verwijderen
  // async removeProduct(userId: string, productId: string): Promise<IUser> {
  //   const user = await this.userModel.findById(userId).exec();

  //   if (!user) {
  //     throw new NotFoundException(`User with id ${userId} not found`);
  //   }
  //   const productIndex = user.cart.findIndex(
  //     (product) => String(product.productId) === productId
  //   );
  //   if (productIndex === -1) {
  //     throw new NotFoundException(
  //       `Product with id ${productId} not found in user's cartLIst`
  //     );
  //   }

  //   //verwijderen in mongo
  //   user.cart.splice(productIndex, 1);

  //   const updatedUser = await user.save();
  //   //verwijdern in neo4j
  //   await this.recommendationService.deleteProductNeo(productId);

  //   return updatedUser;
  // }

  async generateProductRecommendations(productId: string): Promise<IProduct[]> {
    // Gebruik de RecommendationService om aanbevelingen te genereren op basis van het productId
    return this.recommendationService.generateRecommendations(productId);
  }
}
