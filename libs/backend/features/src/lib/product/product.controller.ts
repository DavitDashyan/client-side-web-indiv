import { Controller, Put, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { Get, Param, Post, Body } from '@nestjs/common';
import { IProduct } from '@avans-nx-workshop/shared/api';
import { CreateProductDto } from '@avans-nx-workshop/backend/dto';
import { UpdateProductDto } from '@avans-nx-workshop/backend/dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  // @Get('')
  // getAll(): IProduct[] {
  //     return this.productService.getAll();
  // }

  @Get('')
  async getAll(): Promise<IProduct[]> {
    return await this.productService.getAll();
  }

  // @Get(':id')
  // getOne(@Param('id') id: string): IProduct {
  //     return this.productService.getOne(id);
  // }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<IProduct | null> {
    return await this.productService.getOne(id);
  }

  //voor search
  // @Get('search/:nameProduct')
  // getAllProductsBySearchTerm(@Param('nameProduct') nameProduct: string): IProduct[] {
  //     return this.productService.getAllProductsBySearchTerm(nameProduct);
  // }

  //voor search
  @Get('search/:nameProduct')
  async getAllProductsBySearchTerm(
    @Param('nameProduct') nameProduct: string
  ): Promise<IProduct[]> {
    return await this.productService.getAllProductsBySearchTerm(nameProduct);
  }

  // @Post('')
  // create(@Body() data: CreateProductDto): IProduct {
  //     return this.productService.create(data);
  // }

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
}
