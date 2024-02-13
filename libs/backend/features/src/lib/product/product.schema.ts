import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Conditie, IProduct, IShop } from '@avans-nx-workshop/shared/api';
import { IsMongoId } from 'class-validator';

export type ProductDocument = Product & Document;

@Schema()
export class Product implements IProduct {
  id!: string;
  @IsMongoId()
  _id!: string;

  @Prop({
    required: true,
  })
  nameProduct!: string;

  @Prop({
    required: true,
  })
  price!: number;

  @Prop({
    required: true,
  })
  description!: string;

  @Prop({
    required: true,
  })
  productImageUrl!: string;

  @Prop({
    required: true,
  })
  favorite!: boolean;

  //   @Prop({
  //     required: true,
  //   })
  //   condition!: Conditie;

  @Prop({
    required: true,
    type: String, // Specificeer hier het type voor het 'condition' veld
    enum: Object.values(Conditie), // Zorg ervoor dat het enum-type correct wordt toegepast
  })
  condition!: Conditie;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop', // Reference to the Shop model
    required: true,
  })
  shopId!: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  })
  creatorID!: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
