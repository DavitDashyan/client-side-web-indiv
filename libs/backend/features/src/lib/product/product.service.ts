import { Injectable, NotFoundException } from '@nestjs/common';
import {
  Conditie,
  ICreateProduct,
  IProduct,
} from '@avans-nx-workshop/shared/api';
import { BehaviorSubject, Observable } from 'rxjs';
import { Logger } from '@nestjs/common';
import { ProductDocument } from './product.schema';
import { ShopService } from '../shop/shop.service';
import { Product as ProductModel } from './product.schema';
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
    private readonly shopService: ShopService
  ) {}

  // getAll(): IProduct[] {
  //     Logger.log('getAll', this.TAG);
  //     return this.product$.value;
  // }

  async getAll(): Promise<IProduct[]> {
    this.logger.log(`Finding all items with full writer data`);

    const items = await this.productModel.find().populate('shopId');

    return items;
  }

  //---
  //private productSubject = new BehaviorSubject<IProduct[]>(this.product$.value);

  // getProductObservable(): Observable<IProduct[]> {
  //     return this.productSubject.asObservable();
  // }

  //---

  // getOne(id: string): IProduct {
  //     Logger.log(`getOne(${id})`, this.TAG);
  //     const product = this.product$.value.find((usr) => usr.id === id);
  //     if (!product) {
  //         throw new NotFoundException(`Product could not be found!`);
  //     }
  //     return product;
  // }

  async getOne(id: string): Promise<IProduct | null> {
    this.logger.log(`finding product with id ${id}`);

    // Check if id is null
    // if (id === null || id === 'null') {
    //   this.logger.debug('ID is null or "null"');
    //   return null;
    // }
    // // Use populate to fetch the writer details along with the product
    // const item = await this.productModel
    //   .findOne({ id: id })
    //   .populate('shop')
    //   .exec();

    // if (!item) {
    //   this.logger.debug('Item not found');
    // }

    // return item;
    Logger.log('Get one');
    return await this.productModel.findOne({_id:id}).exec();
  }

  //voor search
  // getAllProductsBySearchTerm(searchTerm:string){
  //     return this.getAll().filter(product=> product.nameProduct.toLowerCase().includes(searchTerm.toLowerCase()))
  // }
  async getAllProductsBySearchTerm(searchTerm: string) {
    return (await this.getAll()).filter((product) =>
      product.nameProduct.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // create(product: ICreateProduct): IProduct {
  //     Logger.log('create', this.TAG);
  //     const current = this.product$.value;
  //     // Use the incoming data, a randomized ID, and a default value of `false` to create the new user
  //     const newProduct: IProduct = {
  //         ...product,
  //         id: `product-${Math.floor(Math.random() * 10000)}`,
  //     };
  //     // Add it to our list of users
  //     this.product$.next([...current, newProduct]);
  //     this.productSubject.next([...current, newProduct]); // Notify subscribers
  //     return newProduct;
  //     }

  async createProduct(productDto: CreateProductDto): Promise<IProduct> {
    const { id, ...productWithoutShop } = productDto;

    // Voeg de schrijver expliciet toe aan het boek
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
}
