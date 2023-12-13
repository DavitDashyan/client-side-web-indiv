import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IUser } from '@avans-nx-workshop/shared/api';

export type UserDocument = User & Document;

@Schema()
export class User implements IUser {
  token?: string | null | undefined;
  //isAdmin: boolean;
  id!: string;

  @Prop({
    required: true,
  })
  name!: string;

  @Prop({
    required: true,
    unique: true,
  })
  email!: string;

  @Prop({
    required: true,
  })
  password!: string;

  @Prop({
    required: true,
  })
  bday!: Date;

  @Prop({
    required: false,
  })
  address!: string;

  @Prop({
    required: false,
  })
  number!: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
