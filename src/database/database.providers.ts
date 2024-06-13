// src/database/database.providers.ts
import { Sequelize } from 'sequelize-typescript';
import { Categoria } from '../categorias/categoria.entity';
import { Comida } from '../comidas/comida.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT ?? '5432', 10),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      });
      sequelize.addModels([Categoria, Comida]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
