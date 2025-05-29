import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'Email registrado',
    example: 'usuario@ejemplo.com',
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    description: 'Contraseña asociada',
    example: 'MiP4ssw0rd!',
  })
  @IsString()
  @MinLength(8)
  readonly password: string;
}
