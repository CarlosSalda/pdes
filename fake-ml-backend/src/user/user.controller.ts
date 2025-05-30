import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Put,
} from '@nestjs/common';
import { Types } from 'mongoose';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';

import { UserService } from './user.service';
import { CreateReviewDto } from 'src/review/dto/create-review.dto';

@ApiTags('User') // Agrupa los endpoints bajo "User" en Swagger UI
@Controller('user')
export class UserController {
  private readonly logger = new Logger('UserController');

  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Obtener usuario por ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async getUserById(@Param('id') userId: string) {
    return await this.userService.getUserById(userId);
  }

  @Put(':userId/favourite/:productId')
  @ApiOperation({ summary: 'Agregar producto a favoritos del usuario' })
  @ApiParam({ name: 'productId', type: String, description: 'ID del producto' })
  @ApiParam({
    name: 'userId',
    type: String,
    description: 'ID del usuario',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Producto agregado a favoritos' })
  async addFavourite(
    @Param('productId') productId: string,
    @Param('userId') userId: string,
  ) {
    return await this.userService.addFavourite(userId, productId);
  }

  @Put('review/:userId')
  @ApiOperation({ summary: 'Agregar reseña a un producto' })
  @ApiParam({ name: 'userId', type: String, description: 'ID del usuario' })
  @ApiBody({ type: CreateReviewDto })
  @ApiResponse({
    status: 201,
    description: 'Reseña creada y asignada al usuario',
  })
  async setReviewToProduct(
    @Param('userId') userId: string,
    @Body() review: CreateReviewDto,
  ) {
    const reviewFixed = {
      ...review,
      user: new Types.ObjectId(userId),
    };
    return await this.userService.setReviewToProduct(userId, reviewFixed);
  }

  @Put(':userId/cart/:productId')
  @ApiOperation({ summary: 'Agregar producto al carrito del usuario' })
  @ApiParam({ name: 'userId', type: String, description: 'ID del usuario' })
  @ApiParam({ name: 'productId', type: String, description: 'ID del producto' })
  @ApiResponse({ status: 200, description: 'Producto agregado al carrito' })
  async addProductToCart(
    @Param('productId') productId: string,
    @Param('userId') userId: string,
  ) {
    return await this.userService.addProductToCart(userId, productId);
  }

  @Delete(':userId/cart/:productId')
  @ApiOperation({ summary: 'Eliminar producto del carrito del usuario' })
  @ApiParam({ name: 'userId', type: String, description: 'ID del usuario' })
  @ApiParam({ name: 'productId', type: String, description: 'ID del producto' })
  @ApiResponse({ status: 200, description: 'Producto eliminado del carrito' })
  async removeProductFromCart(
    @Param('productId') productId: string,
    @Param('userId') userId: string,
  ) {
    return await this.userService.removeProductFromCart(userId, productId);
  }
}
