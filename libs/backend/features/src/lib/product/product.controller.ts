// import { Controller } from '@nestjs/common';

// @Controller('user')
// export class UserController {}
import { Controller } from '@nestjs/common';
import { ProductService } from './product.service';
import { Get, Param, Post, Body } from '@nestjs/common';
import { IProduct } from '@avans-nx-workshop/shared/api';
import { CreateProductDto } from '@avans-nx-workshop/backend/dto';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Get('')
    getAll(): IProduct[] {
        return this.productService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string): IProduct {
        return this.productService.getOne(id);
    }

    @Post('')
    create(@Body() data: CreateProductDto): IProduct {
        return this.productService.create(data);
    } 
}