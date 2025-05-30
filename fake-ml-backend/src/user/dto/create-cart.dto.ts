import {
  IsMongoId,
  ValidateNested,
  IsArray,
  IsInt,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class CartProductDto {
  @ApiProperty({
    example: '60b8aef5f9d5a2a1e4f3d123',
    description: 'MongoDB ObjectId of the product',
  })
  @IsMongoId()
  product: string;

  @ApiProperty({
    example: 2,
    description: 'Quantity of the product to add to the cart',
  })
  @IsInt()
  @Min(1)
  quantity: number;
}

export class CreateCartDto {
  @ApiProperty({
    example: '60b8aef5f9d5a2a1e4f3d999',
    description: 'MongoDB ObjectId of the user',
  })
  @IsMongoId()
  user: string;

  @ApiProperty({
    type: [CartProductDto],
    description: 'List of products and their quantities in the cart',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CartProductDto)
  products: CartProductDto[];
}
