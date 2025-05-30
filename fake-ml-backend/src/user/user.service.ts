import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './models/user.schema';
import { Model } from 'mongoose';
import { Review } from 'src/review/schemas/review.schema';
import { Cart } from './models/cart.schema';
import { Product } from './models/product.schema';

@Injectable()
export class UserService {
  private readonly logger = new Logger('UserService');

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Review.name) private reviewModel: Model<Review>,
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
    @InjectModel(Cart.name) private productModel: Model<Product>,
  ) {}

  async addFavourite(userId: string, productId: string) {
    await this.userModel.findByIdAndUpdate(userId, {
      $push: { favourites: productId },
    });
  }

  async setReviewToProduct(userId: string, review: Partial<Review>) {
    const createdReview = await this.reviewModel.create({
      ...review,
      user: userId,
    });

    await this.userModel.findByIdAndUpdate(userId, {
      $push: { reviews: createdReview._id },
    });
  }

  async addProductToCart(userId: string, productId: string) {
    await this.cartModel.findOneAndUpdate(
      { user: userId },
      { $push: { products: productId } },
      { new: true },
    );
  }

  async removeProductFromCart(userId: string, productId: string) {
    await this.cartModel.findOneAndUpdate(
      { user: userId },
      { $pull: { products: productId } },
      { new: true },
    );
  }

  async getUserById(userId: string) {
    return await this.userModel.findById(userId).populate('reviews');
  }
}
