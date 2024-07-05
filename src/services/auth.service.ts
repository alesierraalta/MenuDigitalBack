// src/services/auth.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private configService: ConfigService) {}

  getApiKey(): string {
    const apiKey = this.configService.get<string>('API_KEY');
    if (!apiKey) {
      throw new Error('API_KEY is not defined in the environment variables');
    }
    return apiKey;
  }

  getApiSecret(): string {
    const apiSecret = this.configService.get<string>('API_SECRET');
    if (!apiSecret) {
      throw new Error('API_SECRET is not defined in the environment variables');
    }
    return apiSecret;
  }
}