// src/cart/schemas/cart.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Product } from './product.schema';

export type CartDocument = Cart & Document;

@Schema({ collection: 'carts', timestamps: true })
export class Cart {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  user: Types.ObjectId;

  @Prop([
    {
      product: { type: Types.ObjectId, ref: Product.name, required: true },
      quantity: { type: Number, required: true, min: 1 },
    },
  ])
  products: {
    product: Types.ObjectId;
    quantity: number;
  }[];

  @Prop({ type: Types.ObjectId, ref: 'Cart' })
  cart: Types.ObjectId;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
