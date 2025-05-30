import { IsMongoId, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddToCartDto {
  @ApiProperty({
    example: '60b8aef5f9d5a2a1e4f3d123',
    description: 'Product ObjectId to add',
  })
  @IsMongoId()
  productId: string;

  @ApiProperty({ example: 3, description: 'Quantity of the product to add' })
  @IsInt()
  @Min(1)
  quantity: number;
}
