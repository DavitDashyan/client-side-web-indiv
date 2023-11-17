import {
    IsNotEmpty,
    IsString,
    IsBoolean,
    IsOptional,
    IsDate
} from 'class-validator';
import {
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

    @IsString()
    @IsNotEmpty()
    id!: Id;

    @IsBoolean()
    @IsNotEmpty()
    number!: number;

    @IsDate()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;

    @IsString()
    @IsNotEmpty()
    bday!: Date;
}

export class UpsertUserDto implements IUpsertUser {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    address!: string;

    @IsString()
    @IsNotEmpty()
    id!: Id;

    @IsBoolean()
    @IsNotEmpty()
    number!: number;

    @IsDate()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;

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

    @IsBoolean()
    @IsOptional()
    email!: string;

    @IsBoolean()
    @IsOptional()
    password!: string;

    @IsBoolean()
    @IsOptional()
    bday!: Date;

    @IsBoolean()
    @IsOptional()
    number!: number;
}



