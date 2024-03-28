import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsOptional,
  IsDate,
  IS_EMAIL,
  IsEmail,
  IsInt,
  IsMongoId,
  IsArray,
} from 'class-validator';
import {
  ICart,
  ICartItem,
  ICreateUser,
  IUpdateUser,
  IUpsertUser,
} from '@avans-nx-workshop/shared/api';
import { Id } from 'libs/shared/api/src/lib/models/id.type';

/**
 * Use the `Pick` utility type to extract only the properties we want for
 * new to-do items
 */
export class CreateUserDto implements ICreateUser {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  address!: string;

  // @IsString()
  // @IsNotEmpty()
  // @IsMongoId()
  _id!: Id;

  @IsInt()
  @IsNotEmpty()
  number!: number;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsString()
  // @IsDate()
  @IsNotEmpty()
  bday!: Date;

  @IsNotEmpty()
  cart!: ICart;
}

export class UpsertUserDto implements IUpsertUser {
  @IsString()
  @IsNotEmpty()
  _id!: string;

  @IsNotEmpty()
  cart!: ICartItem[];

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  address!: string;

  @IsInt()
  @IsNotEmpty()
  number!: number;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  // @IsDate()
  @IsString()
  @IsNotEmpty()
  bday!: Date;
}

export class UpdateUserDto implements IUpdateUser {
  @IsString()
  @IsOptional()
  name!: string;

  @IsString()
  @IsOptional()
  address!: string;

  @IsEmail()
  @IsOptional()
  email!: string;

  @IsString()
  @IsOptional()
  password!: string;

  // @IsDate()
  @IsString()
  @IsOptional()
  bday!: Date;

  @IsInt()
  @IsOptional()
  number!: number;

  @IsNotEmpty()
  cart!: ICartItem[];

  _id!: Id;
}
