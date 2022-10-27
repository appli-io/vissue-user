import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  secret: process.env.JWT_SECRET,
  expiration: process.env.JWT_EXPIRATION_TIME,
  refreshSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
  refreshTokenExpiration: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME
}));
