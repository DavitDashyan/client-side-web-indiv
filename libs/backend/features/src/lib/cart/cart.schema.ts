// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import mongoose, { Document, Types } from 'mongoose';
// import {
//   Conditie,
//   ICart,
//   ICartItem,
//   IProduct,
//   IUser,
//   Id,
// } from '@avans-nx-workshop/shared/api';
// import { IsMongoId } from 'class-validator';

// export type CartDocument = Cart & Document;

// @Schema()
// export class Cart implements ICart {
//   @Prop({ required: true })
//   items: ICartItem[] = []; // Add initializer

//   @IsMongoId()
//   _id!: Id;

//   // @Prop({
//   //   type: [{
//   //       id: { type: String, ref: 'User' },
//   //       _id: false
//   //   }],
//   //   userId: { type: String, ref: 'User' },
//   // })
//   // userId!: string; // Add the missing 'userId' property

//   @Prop({
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User', // Reference to the User model
//     required: true,
//   })
//   userId!: string;
// }
// export const CartSchema = SchemaFactory.createForClass(Cart);
