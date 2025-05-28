// src/reviews/schemas/review.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'reviews' })
export class Review extends Document {
  @Prop({ required: true, trim: true })
  productUrl: string;

  @Prop({ required: true, min: 0, max: 5 })
  rating: number;

  @Prop({ default: '' })
  comment: string;

  @Prop({ type: Date, default: () => new Date() })
  createdAt: Date;

  // <--- romper la circular import: ref como string
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
