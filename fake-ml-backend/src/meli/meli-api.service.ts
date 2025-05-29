// src/meli/meli-api.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { MeliAuthService } from './meli-auth.service';
import { Logger } from '@nestjs/common';
import { BadRequestException, NotFoundException } from '@nestjs/common';

@Injectable()
export class MeliApiService {
  private readonly logger = new Logger(MeliAuthService.name);
  constructor(private readonly auth: MeliAuthService) {}

  async getItemById(itemId: string) {
    const token = await this.auth.getAccessToken();
    this.logger.log(`Obteniendo info del item ${itemId}`);
    const url = `https://api.mercadolibre.com/products/${itemId}`;
    try {
      const { data } = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (error) {
      if (error.status === 404) {
        throw new NotFoundException('No se encontro el item');
      }
      throw error;
    }
  }

  async getItemsByQuery(query: string) {
    const token = await this.auth.getAccessToken();
    this.logger.log(`Obteniendo info del item ${query}`);
    const url = `https://api.mercadolibre.com/products/search?status=active&site_id=MLA&q=${query}`;
    try {
      const { data } = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (error) {
      if (error.status === 404) {
        throw new NotFoundException('No se encontro el item');
      }
      throw error;
    }
  }
}
