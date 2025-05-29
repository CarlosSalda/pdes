import { registerAs } from '@nestjs/config';

export default registerAs('meli', () => ({
  clientId: process.env.MELI_CLIENT_ID,
  clientSecret: process.env.MELI_CLIENT_SECRET,
  redirectUri: process.env.MELI_REDIRECT_URI,
  authCode: process.env.MELI_AUTH_CODE,
  currentToken: process.env.MELI_CURRENT_TOKEN,
}));
