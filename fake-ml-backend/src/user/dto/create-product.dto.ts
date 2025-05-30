import { IsString, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'abc-123', description: 'Unique product ID' })
  @IsString()
  productId: string;

  @ApiProperty({
    example: 'https://example.com/product.jpg',
    description: 'Product image or page URL',
  })
  @IsString()
  url: string;

  @ApiProperty({ example: 10, description: 'Stock available for the product' })
  @IsInt()
  @Min(0)
  stock: number;

  @ApiProperty({ example: 100, description: 'Price of the product' })
  @IsInt()
  @Min(0)
  price: number;
}
