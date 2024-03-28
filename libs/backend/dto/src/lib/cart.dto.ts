import { ICartItem, ICart, Id } from '@avans-nx-workshop/shared/api';
import { IsString, IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class AddToCartDto implements ICartItem {
  @IsString()
  @IsNotEmpty()
  productId!: string;

  @IsInt()
  @IsNotEmpty()
  quantity!: number;

  @IsString()
  @IsNotEmpty()
  nameProduct!: string;

  @IsNumber()
  @IsNotEmpty()
  price!: number;

  @IsString()
  @IsNotEmpty()
  productImageUrl!: string;

  _id!: Id;

  @IsString()
  @IsNotEmpty()
  userId!: string;
}

export class UpdateQuantityDto {
  @IsString()
  @IsNotEmpty()
  productId!: string;

  @IsInt()
  @IsNotEmpty()
  quantity!: number;

  @IsString()
  @IsNotEmpty()
  nameProduct!: string;

  @IsNumber()
  @IsNotEmpty()
  price!: number;

  @IsString()
  @IsNotEmpty()
  productImageUrl!: string;

  _id!: Id;

  @IsString()
  @IsNotEmpty()
  userId!: string;
}

export class UpsertCartDto {
  @IsString()
  @IsNotEmpty()
  productId!: string;

  @IsInt()
  @IsNotEmpty()
  quantity!: number;

  @IsString()
  @IsNotEmpty()
  nameProduct!: string;

  @IsNumber()
  @IsNotEmpty()
  price!: number;

  @IsString()
  @IsNotEmpty()
  productImageUrl!: string;

  _id!: Id;

  @IsString()
  @IsNotEmpty()
  userId!: string;
}
