export interface JwtConfig {
  getJwtSecret(): string;

  getJwtExpiration(): string;

  getJwtRefreshSecret(): string;

  getJwtRefreshTokenExpiration(): string;
}
