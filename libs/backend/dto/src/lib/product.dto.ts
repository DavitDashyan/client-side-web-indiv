import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsEnum,
  IsBoolean,
} from 'class-validator';
import {
  Id,
  Conditie,
  ICreateProduct,
  IUpdateProduct,
  IUpsertProduct,
  IShop,
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

  // @IsString()
  // @IsNotEmpty()
  id!: Id;

  @IsInt()
  @IsNotEmpty()
  price!: number;

  @IsString()
  @IsNotEmpty()
  productImageUrl!: string;

  @IsBoolean()
  @IsNotEmpty()
  favorite!: boolean;

  @IsEnum(Conditie)
  @IsNotEmpty()
  condition!: Conditie;

  // @IsNotEmpty()
  shopId!: string;

  // @IsString()
  // @IsNotEmpty()
  creatorID!: string;
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

  @IsString()
  @IsNotEmpty()
  productImageUrl!: string;

  @IsBoolean()
  @IsNotEmpty()
  favorite!: boolean;

  @IsEnum(Conditie)
  @IsNotEmpty()
  condition!: Conditie;

  @IsNotEmpty()
  shopId!: string;

  @IsString()
  @IsNotEmpty()
  creatorID!: string;
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

  @IsString()
  @IsNotEmpty()
  productImageUrl!: string;

  @IsBoolean()
  @IsNotEmpty()
  favorite!: boolean;

  @IsEnum(Conditie)
  @IsNotEmpty()
  condition!: Conditie;

  @IsNotEmpty()
  shopId!: string;

  @IsString()
  @IsNotEmpty()
  creatorID!: string;
}
