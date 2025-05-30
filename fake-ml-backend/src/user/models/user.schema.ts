import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, ValidatorProps } from 'mongoose';
import { Review } from 'src/review/schemas/review.schema';
import { Cart } from './cart.schema';

export type UserDocument = User & Document;

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

@Schema({ collection: 'users', timestamps: true })
export class User {
  @Prop({
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: (props: ValidatorProps) => `${props.value} is not a valid email`,
    },
  })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    type: String,
    enum: Object.values(Role),
    default: Role.USER,
  })
  role: Role;

  @Prop({
    type: [{ type: Types.ObjectId, ref: Review.name }],
    autopopulate: false,
    default: [],
  })
  reviews: Types.ObjectId[];

  @Prop({
    type: [String],
    autopopulate: false,
    default: [],
  })
  favourites: string[];

  @Prop({
    type: Types.ObjectId,
    ref: Cart.name,
    required: true,
    unique: true,
    default: new Types.ObjectId(),
  })
  cart: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
