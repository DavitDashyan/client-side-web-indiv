import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { IShop } from '@avans-nx-workshop/shared/api';

export type ShopDocument = Shop & Document;

@Schema()
export class Shop implements IShop {

  id!: string;

  @Prop({
    required: true,
  })
  name!: string;

  @Prop({
    required: true,
  })
  telNumber!: number;

  @Prop({
    required: true,
  })
  email!: string;

  @Prop({
    required: true,
  })
  shopImageUrl!: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  })
creatorID!: string;
}

export const ShopSchema = SchemaFactory.createForClass(Shop);
