// src/meli/meli.controller.ts
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { MeliAuthService } from './meli-auth.service';
import { MeliApiService } from './meli-api.service';
import { Logger } from '@nestjs/common';
import { AuthGuard } from 'src/guard/auth.guard';

@ApiTags('meli')
@Controller('meli')
export class MeliController {
  private readonly logger = new Logger(MeliController.name);
  constructor(
    private readonly authService: MeliAuthService,
    private readonly apiService: MeliApiService,
  ) {}

  @Get('token')
  @ApiOperation({ summary: 'Obtener access token de MercadoLibre' })
  @ApiResponse({
    status: 200,
    description: 'Token válido',
    schema: { example: { accessToken: 'APP_USR-1234abcd...' } },
  })
  @ApiResponse({
    status: 404,
    description: 'Error al obtener el token',
  })
  async getToken() {
    const accessToken = await this.authService.getAccessToken();
    return { accessToken };
  }

  @Get('items/:id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Obtener información de un ítem de MercadoLibre' })
  @ApiParam({
    name: 'id',
    description: 'ID del ítem en MercadoLibre',
    example: 'MLA123456789',
  })
  @ApiResponse({
    status: 200,
    description: 'Datos del ítem retornados por MercadoLibre',
  })
  @ApiResponse({
    status: 404,
    description: 'Error al obtener los datos del ítem',
  })
  async getItemById(@Param('id') id: string): Promise<Record<string, any>> {
    return await this.apiService.getItemById(id);
  }

  @Get('items')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Obtener información de un ítem de MercadoLibre' })
  @ApiQuery({
    name: 'query',
    description: 'Query de búsqueda',
    example: 'camiseta',
  })
  @ApiResponse({
    status: 200,
    description: 'Datos del ítem retornados por MercadoLibre',
  })
  @ApiResponse({
    status: 404,
    description: 'Error al obtener los datos del ítem',
  })
  async getItemsByQuery(@Query('query') query: string) {
    return await this.apiService.getItemsByQuery(query);
  }
}
