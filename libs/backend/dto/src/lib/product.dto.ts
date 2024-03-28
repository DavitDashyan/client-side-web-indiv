import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsEnum,
  IsBoolean,
  IsMongoId,
  IsOptional,
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

  @IsMongoId()
  @IsOptional()
  _id?: Id;

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
  shopId?: string;

  // @IsString()
  // @IsNotEmpty()
  creatorID!: string;
}

export class UpsertProductDto implements IUpsertProduct {
  @IsMongoId()
  @IsNotEmpty()
  _id!: string;
  
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

 // @IsNotEmpty()
  shopId?: string;

  @IsString()
  @IsNotEmpty()
  creatorID!: string;
}

export class UpdateProductDto implements IUpdateProduct {

  _id!: string | undefined;

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

  //@IsNotEmpty()
  shopId?: string;

  @IsString()
  @IsNotEmpty()
  creatorID!: string;
}
