// src/products/schemas/product.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ collection: 'products' })
export class Product {
  @Prop({ required: true, unique: true })
  productId: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true, min: 0 })
  stock: number;

  @Prop({ required: true })
  price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
