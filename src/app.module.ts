// src/app.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoriasModule } from './categorias/categorias.module';
import { ComidasModule } from './comidas/comidas.module';

import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'password',
      database: process.env.POSTGRES_DATABASE || 'database',
      autoLoadModels: true,
      synchronize: true,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    }),
    CategoriasModule,
    ComidasModule,
  ],
})
export class AppModule {}
