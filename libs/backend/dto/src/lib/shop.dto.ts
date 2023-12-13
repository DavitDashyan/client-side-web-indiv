import { IsNotEmpty, IsString, IsEmail, IsInt } from 'class-validator';
import {
  ICreateShop,
  IUpdateShop,
  IUpsertShop,
} from '@avans-nx-workshop/shared/api';
import { Id } from 'libs/shared/api/src/lib/models/id.type';

/**
 * Use the `Pick` utility type to extract only the properties we want for
 * new to-do items
 */
export class CreateShopDto implements ICreateShop {
  @IsString()
  @IsNotEmpty()
  name!: string;

  // @IsString()
  // @IsNotEmpty()
  id!: Id;

  @IsInt()
  @IsNotEmpty()
  telNumber!: number;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  shopImageUrl!: string;

  // @IsString()
  // @IsNotEmpty()
  creatorID!: string;
}

export class UpsertShopDto implements IUpsertShop {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  id!: Id;

  @IsInt()
  @IsNotEmpty()
  telNumber!: number;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  shopImageUrl!: string;

  @IsString()
  @IsNotEmpty()
  creatorID!: string;
}

export class UpdateShopDto implements IUpdateShop {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  id!: Id;

  @IsInt()
  @IsNotEmpty()
  telNumber!: number;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  shopImageUrl!: string;

  @IsString()
  @IsNotEmpty()
  creatorID!: string;
}
