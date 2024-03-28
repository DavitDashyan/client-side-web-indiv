import { Controller, Put, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { Get, Param, Post, Body } from '@nestjs/common';
import { IProduct } from '@avans-nx-workshop/shared/api';
import { CreateProductDto } from '@avans-nx-workshop/backend/dto';
import { UpdateProductDto } from '@avans-nx-workshop/backend/dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('')
  async getAll(): Promise<IProduct[]> {
    return await this.productService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<IProduct | null> {
    return await this.productService.getOne(id);
  }


  //voor search
  @Get('search/:nameProduct')
  async getAllProductsBySearchTerm(
    @Param('nameProduct') nameProduct: string
  ): Promise<IProduct[]> {
    return await this.productService.getAllProductsBySearchTerm(nameProduct);
  }

  @Post('')
  async create(@Body() createProductDto: CreateProductDto): Promise<IProduct> {
    const createdProduct = await this.productService.createProduct(
      createProductDto
    );
    return createdProduct;
  }

  @Put(':id')
  async update(
    @Param('id') productId: string,
    @Body() updateProductDto: UpdateProductDto
  ) {
    const updatedProduct = await this.productService.update(
      productId,
      updateProductDto
    );
    return { message: 'product updated successfully', product: updatedProduct };
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.productService.deleteProduct(id);
  }

  @Post('/:productId/:userId/cartList')
  async addCartlist(
    @Param('userId') userId: string,
    @Body() { productId }: { productId: IProduct }
  ): Promise<void> {
    const productID: IProduct = productId;
    await this.productService.addProduct(userId, productID);
  }

  @Delete('/:productId/:userId/cartList')
  async removeProduct(
    @Param('boekId') boekId: string,
    @Param('userId') userId: string
  ): Promise<void> {
    await this.productService.removeProduct(userId, boekId);
  }
}
