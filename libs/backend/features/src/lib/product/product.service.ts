import { Injectable, NotFoundException } from '@nestjs/common';
import {
  Conditie,
  ICartItem,
  ICreateProduct,
  IProduct,
  IUser,
} from '@avans-nx-workshop/shared/api';
import { BehaviorSubject, Observable } from 'rxjs';
import { Logger } from '@nestjs/common';
import { Product, ProductDocument } from './product.schema';
import { ShopService } from '../shop/shop.service';
import { Product as ProductModel } from './product.schema';
import { User as UserModel, UserDocument } from '../user/user.shema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateProductDto,
  UpdateProductDto,
} from '@avans-nx-workshop/backend/dto';

@Injectable()
export class ProductService {
  // TAG = 'ProductService';
  // private product$ = new BehaviorSubject<IProduct[]>([ testdata ]);

  private readonly logger: Logger = new Logger(ProductService.name);

  constructor(
    @InjectModel(ProductModel.name)
    private productModel: Model<ProductDocument>,
    private readonly shopService: ShopService,

    @InjectModel(UserModel.name) private userModel: Model<UserDocument>
  ) {}

  async getAll(): Promise<IProduct[]> {
    this.logger.log(`Finding all items with full writer data`);

    const items = await this.productModel.find().populate('shopId');

    return items;
  }

  async getOne(id: string): Promise<IProduct | null> {
    this.logger.log(`finding product with id ${id}`);

    Logger.log('Get one');
    return await this.productModel.findOne({ _id: id }).exec();
  }

  async getAllProductsBySearchTerm(searchTerm: string) {
    return (await this.getAll()).filter((product) =>
      product.nameProduct.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  async createProduct(productDto: CreateProductDto): Promise<IProduct> {
    const { _id, ...productWithoutShop } = productDto;

    const productData = {
      ...productWithoutShop,
    };

    const createdProduct = await this.productModel.create(productData);
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

    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<void> {
    this.logger.log(`Deleting Product with id ${id}`);
    const deletedItem = await this.productModel.findByIdAndDelete(id).exec();

    if (!deletedItem) {
      this.logger.debug('Product not found for deletion');
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    this.logger.log(`Product deleted successfully`);
  }

  async addProduct(userId: string, productId: IProduct): Promise<IUser> {
    const user = await this.userModel.findById(userId).exec();

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    const newProduct: ICartItem = {
      _id: '',
      productId: String(productId),
      quantity: 1,
      nameProduct: '',
      price: 0,
      productImageUrl: '',
    };
    console.log('productId newProduct:', newProduct.productId);

    user.cart.push(newProduct);
    console.log('user.cart AA:', user.cart);
    console.log('newProduct:', newProduct);

    const updatedUser = await user.save();

    return updatedUser;
  }
  async removeProduct(userId: string, productId: string): Promise<IUser> {
    const user = await this.userModel.findById(userId).exec();

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    const productIndex = user.cart.findIndex(
      (product) => String(product.productId) === productId
    );
    if (productIndex === -1) {
      throw new NotFoundException(
        `Product with id ${productId} not found in user's cartLIst`
      );
    }

    //verwijderen
    user.cart.splice(productIndex, 1);

    const updatedUser = await user.save();

    return updatedUser;
  }
}
