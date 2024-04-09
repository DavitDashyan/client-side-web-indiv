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
  ICartItem,
  ICreateUser,
  IProduct,
  IUpdateUser,
  IUpsertUser,
} from '@avans-nx-workshop/shared/api';
import { Id } from 'libs/shared/api/src/lib/models/id.type';

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
  cart!: ICartItem[];

  @IsNotEmpty()
  favorite!: IProduct[];
}

export class UpsertUserDto implements IUpsertUser {
  @IsString()
  @IsNotEmpty()
  _id!: string;

  @IsNotEmpty()
  cart!: ICartItem[];

  @IsNotEmpty()
  favorite!: IProduct[];

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

  @IsNotEmpty()
  favorite!: IProduct[];

  _id!: Id;
}
