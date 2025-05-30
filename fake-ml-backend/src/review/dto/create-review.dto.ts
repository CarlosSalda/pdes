import {
  IsString,
  IsNumber,
  Min,
  Max,
  IsOptional,
  IsMongoId,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({
    example: 'https://example.com/product/123',
    description: 'URL del producto al que se refiere la reseña',
  })
  @IsString()
  productUrl: string;

  @ApiProperty({
    example: 4.5,
    description: 'Puntaje de la reseña (entre 0 y 5)',
    minimum: 0,
    maximum: 5,
  })
  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  @ApiProperty({
    example: 'Excelente producto, muy recomendable.',
    required: false,
    description: 'Comentario opcional de la reseña',
  })
  @IsOptional()
  @IsString()
  comment?: string;

  @ApiProperty({
    example: '60b8aef5f9d5a2a1e4f3d999',
    description: 'ID del usuario que escribe la reseña',
  })
  @IsMongoId()
  user: string;
}
