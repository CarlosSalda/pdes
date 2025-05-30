// src/auth/auth.controller.ts
import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  UnauthorizedException,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Registro exitoso' })
  @ApiResponse({ status: 409, description: 'Email ya registrado' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiBody({ type: RegisterDto })
  async register(@Body() dto: RegisterDto) {
    const message = await this.authService.register(dto);
    return { message };
  }

  @Post('register-admin')
  @ApiOperation({ summary: 'Registrar un nuevo administrador' })
  @ApiResponse({ status: 201, description: 'Registro exitoso' })
  @ApiResponse({ status: 409, description: 'Email ya registrado' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiBody({ type: RegisterDto })
  async registerAdmin(@Body() dto: RegisterDto) {
    const message = await this.authService.registerAdmin(dto);
    return { message };
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Obtener token JWT al autenticar' })
  @ApiResponse({ status: 200, description: 'Token generado correctamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  @ApiBody({ type: LoginDto })
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('getUser')
  @ApiOperation({ summary: 'Obtener usuario por token JWT' })
  @ApiResponse({ status: 200, description: 'Usuario obtenido' })
  @ApiResponse({ status: 401, description: 'Token inválido' })
  async getUser(@Req() req: Request) {
    const authHeader = req.headers['authorization'] as string;
    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid authorization format');
    }

    return await this.authService.getUser(token);
  }

  @Post('logout')
  @ApiOperation({ summary: 'Cerrar sesión' })
  @ApiResponse({ status: 200, description: 'Sesión cerrada' })
  @ApiResponse({ status: 401, description: 'Token inválido' })
  async logout(@Req() req: Request) {
    const authHeader = req.headers['authorization'] as string;
    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid authorization format');
    }

    return await this.authService.logout(token);
  }
}
