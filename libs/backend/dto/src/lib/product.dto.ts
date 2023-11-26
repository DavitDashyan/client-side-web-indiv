import {
    IsNotEmpty,
    IsString,
    IsInt,
    IsEnum,
} from 'class-validator';
import {
    Id,
    Conditie,
    ICreateProduct,
    IUpdateProduct,
    IUpsertProduct,
  
} from '@avans-nx-workshop/shared/api';

/**
 * Use the `Pick` utility type to extract only the properties we want for
 * new to-do items
 */
export class CreateProductDto implements ICreateProduct {
    @IsString()
    @IsNotEmpty()
    nameProduct!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsString()
    @IsNotEmpty()
    id!: Id;

    @IsInt()
    @IsNotEmpty()
    price!: number;

    @IsEnum(Conditie)
    @IsNotEmpty()
    condition!: Conditie;
}

export class UpsertProductDto implements IUpsertProduct {

    @IsString()
    @IsNotEmpty()
    id!: Id;

    @IsString()
    @IsNotEmpty()
    nameProduct!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsInt()
    @IsNotEmpty()
    price!: number;

    @IsEnum(Conditie)
    @IsNotEmpty()
    condition!: Conditie;
}

export class UpdateProductDto implements IUpdateProduct {
    @IsString()
    @IsNotEmpty()
    nameProduct!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsInt()
    @IsNotEmpty()
    price!: number;

    @IsEnum(Conditie)
    @IsNotEmpty()
    condition!: Conditie;
}