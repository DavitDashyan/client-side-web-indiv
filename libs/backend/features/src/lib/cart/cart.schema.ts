import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Conditie, IProduct } from '@avans-nx-workshop/shared/api';
import { IsMongoId } from 'class-validator';

export type CartDocument = Cart & Document;

@Schema()
export class Cart implements IProduct {
  id!: string;

  @IsMongoId()
  _id!: string;

  @Prop({ required: true })
  nameProduct!: string;

  @Prop({ required: true })
  price!: number;

  @Prop({ required: true })
  description!: string;

  productImageUrl!: string;

  @Prop({ required: true })
  favorite!: boolean;

  @Prop({
    required: true,
    enum: [
      'Nieuw',
      'Zo Goed Als Nieuw',
      'Licht Gebruikt',
      'Zichtbaar Gebruikt',
    ],
    type: String, // Add this line to explicitly specify the type
  })
  condition!: Conditie;

  // @Prop({ required: true })

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop',
    required: true,
  })
  shopId!: string;

  // @Prop({ required: true })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  creatorID!: string;
}

export const CartSchema = SchemaFactory.createForClass(Cart);

// @Prop({
//   type: mongoose.Schema.Types.ObjectId,
//   ref: 'Shop', // Reference to the Shop model
//   required: true,
// })
// shopId!: string;

// @Prop({
//   type: mongoose.Schema.Types.ObjectId,
//   ref: 'User', // Reference to the User model
//   required: true,
// })
