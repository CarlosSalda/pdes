// src/meli/meli-auth.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Cron } from '@nestjs/schedule';

interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

@Injectable()
export class MeliAuthService {
  private readonly logger = new Logger(MeliAuthService.name);
  private token: string = '';

  constructor(private readonly config: ConfigService) {
    this.token = this.config.get('meli.currentToken') || '';
  }

  private refreshToken: string = 'TG-6836b5b509ba9e000149aa75-307642366';
  private expiresAt: number = 0; // timestamp en ms

  /** Retorna un token válido, refrescando si es necesario */
  async getAccessToken(): Promise<string> {
    const now = Date.now();

    if (!this.token || now + 21000 > this.expiresAt) {
      if (this.refreshToken) {
        await this.refresh();
      } else {
        await this.obtain();
      }
    }
    this.logger.log(`Obteniendo token de ML, actual: ${this.token}`);
    return this.token;
  }

  private async obtain(): Promise<void> {
    const { clientId, clientSecret, redirectUri } = this.config.get('meli');
    const code = await this.loadAuthorizationCodeFromStart();
    const url = 'https://api.mercadolibre.com/oauth/token';
    const payload = {
      grant_type: 'authorization_code',
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: redirectUri,
    };
    this.logger.log('Obteniendo access_token de ML');
    const { data } = await axios.post<TokenResponse>(url, payload);
    this.setTokenResponse(data);
    this.logger.log('Obtenido nuevo access_token de ML', JSON.stringify(data));
  }

  private async refresh(): Promise<void> {
    const { clientId, clientSecret } = this.config.get('meli');
    const url = 'https://api.mercadolibre.com/oauth/token';
    const payload = {
      grant_type: 'refresh_token',
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: this.refreshToken,
    };
    const { data } = await axios.post<TokenResponse>(url, payload);
    this.setTokenResponse(data);
    this.logger.log('Refrescado access_token de ML');
  }

  private setTokenResponse(data: TokenResponse) {
    this.token = data.access_token;
    this.refreshToken = data.refresh_token;
    this.expiresAt = Date.now() + data.expires_in * 1000;
  }

  @Cron('0 */5 * * *')
  async handleCron() {
    if (this.refreshToken) {
      await this.refresh();
    }
  }

  private loadAuthorizationCodeFromStart(): Promise<string> {
    const { authCode } = this.config.get('meli.authCode');
    return authCode ?? '';
  }
}
