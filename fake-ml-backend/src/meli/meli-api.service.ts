// src/meli/meli-api.service.ts
import { Injectable } from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import { MeliAuthService } from './meli-auth.service';
import { Logger } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class MeliApiService {
  private readonly logger = new Logger(MeliAuthService.name);
  constructor(private readonly auth: MeliAuthService) {}

  async getItemById(itemId: string): Promise<Record<string, any>> {
    const token = await this.auth.getAccessToken();
    this.logger.log(`Obteniendo info del item ${itemId}`);
    const url = `https://api.mercadolibre.com/products/${itemId}`;
    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data as Record<string, any>;
    } catch (error) {
      if (error instanceof AxiosError && error.status === 404) {
        throw new NotFoundException('No se encontro el item');
      }
      throw error;
    }
  }

  async getItemsByQuery(query: string): Promise<Record<string, any>[]> {
    const token = await this.auth.getAccessToken();
    this.logger.log(`Obteniendo info del item ${query}`);
    const url = `https://api.mercadolibre.com/products/search?status=active&site_id=MLA&q=${query}`;
    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data as Record<string, any>[];
    } catch (error) {
      if (error instanceof AxiosError && error.status === 404) {
        throw new NotFoundException('No se encontraron los items');
      }
      throw error;
    }
  }
}
