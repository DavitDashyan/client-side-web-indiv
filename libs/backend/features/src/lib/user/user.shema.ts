import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ICart, ICartItem, IUser } from '@avans-nx-workshop/shared/api';

export type UserDocument = User & Document;

@Schema()
export class User implements IUser {
  _id!: string;
  token?: string | null | undefined;

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

  // @Prop({
  //   type: [
  //     {
  //       productId: {
  //         type: mongoose.Schema.Types.ObjectId,
  //         ref: 'Product',
  //         required: true,
  //       },
  //     },
  //   ],
  //   default: [],
  // })
  // cartList!: ICart[];

  @Prop({ required: false })
  cart!: ICartItem[];
}

export const UserSchema = SchemaFactory.createForClass(User);
