import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comida } from '../comidas/comida.entity';
import { Categoria } from '../categorias/categoria.entity';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST as string,
      port: parseInt(process.env.POSTGRES_PORT as string, 10) || 5432,
      username: process.env.POSTGRES_USER as string,
      password: String(process.env.POSTGRES_PASSWORD),  // Verificación explícita de cadena
      database: process.env.POSTGRES_DATABASE as string,
      autoLoadModels: true,
      synchronize: true,
      dialectOptions: {
        ssl: process.env.NODE_ENV === 'production' ? {
          require: true,
          rejectUnauthorized: false,
        } : false,
      },
      models: [Comida, Categoria],
    }),
  ],
})
export class DatabaseModule {}
