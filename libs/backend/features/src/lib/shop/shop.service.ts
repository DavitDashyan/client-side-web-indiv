import { Injectable, NotFoundException } from '@nestjs/common';
import { IShop } from '@avans-nx-workshop/shared/api';
import { Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Shop as ShopModel, ShopDocument } from './shop.schema';
import { CreateShopDto, UpdateShopDto } from '@avans-nx-workshop/backend/dto';

@Injectable()
export class ShopService {
  private readonly logger: Logger = new Logger(ShopService.name);

  constructor(
    @InjectModel(ShopModel.name) private shopModel: Model<ShopDocument>
  ) {}

  async getAll(): Promise<IShop[]> {
    this.logger.log(`Finding all items`);
    const items = await this.shopModel.find();
    return items;
  }

  async getOne(id: string): Promise<IShop | null> {
    this.logger.log(`finding product with id ${id}`);

    Logger.log('Get one');
    return await this.shopModel.findOne({ _id: id }).exec();
  }

  async create(shopDto: CreateShopDto): Promise<IShop> {
    this.logger.log(`Create shop ${shopDto.name}`);
    this.logger.log(`ShopDtoName ${shopDto.name}`);

    // Sluit _id uit
    const { _id, ...shopWithoutId } = shopDto;

    const createdItem = await this.shopModel.create(shopWithoutId);
    return createdItem;
  }

  async update(shopId: string, updateShopDto: UpdateShopDto): Promise<IShop> {
    const existingShop = await this.shopModel.findById(shopId).exec();

    if (!existingShop) {
      throw new NotFoundException(`Shop with id ${shopId} not found`);
    }

    // Update shop properties
    Object.assign(existingShop, updateShopDto);

    // Save the updated shop
    const updatedShop = await existingShop.save();

    return updatedShop;
  }

  async deleteShop(id: string): Promise<void> {
    this.logger.log(`Deleting shop with id ${id}`);
    const deletedItem = await this.shopModel.findByIdAndDelete(id).exec();

    if (!deletedItem) {
      this.logger.debug('Shop not found for deletion');
      throw new NotFoundException(`Shop with _id ${id} not found`);
    }

    this.logger.log(`Shop deleted successfully`);
  }
}
