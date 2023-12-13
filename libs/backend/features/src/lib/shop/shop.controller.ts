import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
  Body,
} from '@nestjs/common';
import { ShopService } from './shop.service';
import { IShop } from '@avans-nx-workshop/shared/api';
import { CreateShopDto, UpdateShopDto } from '@avans-nx-workshop/backend/dto';

@Controller('shop')
export class ShopController {
  constructor(private shopService: ShopService) {}

  @Get('')
  async getAll(): Promise<IShop[]> {
    return await this.shopService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<IShop | null> {
    return await this.shopService.getOne(id);
  }

  @Post('')
  async create(@Body() createShopDto: CreateShopDto): Promise<IShop> {
    const { ...shopWithoutId } = createShopDto;
    return await this.shopService.create(shopWithoutId);
  }

  @Put(':id')
  async update(
    @Param('id') shopId: string,
    @Body() updateShopDto: UpdateShopDto
  ) {
    const updatedShop = await this.shopService.update(shopId, updateShopDto);
    return { message: 'shop updated successfully', shop: updatedShop };
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.shopService.deleteShop(id);
  }
}

export { ShopService };
