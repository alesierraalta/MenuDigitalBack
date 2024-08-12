import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config(); // Cargar las variables de entorno

  // Imprimir las variables de entorno para verificar
  console.log('POSTGRES_HOST:', process.env.POSTGRES_HOST);
  console.log('POSTGRES_PORT:', process.env.POSTGRES_PORT);
  console.log('POSTGRES_USER:', process.env.POSTGRES_USER);
  console.log('POSTGRES_PASSWORD:', process.env.POSTGRES_PASSWORD);
  console.log('POSTGRES_DATABASE:', process.env.POSTGRES_DATABASE);

  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors({
    origin:'https://18b27a0c-5539-423c-aa44-d127de9dfea4.e1-us-east-azure.choreoapps.dev',
    //origin: 'http://localhost:5173', // Frontend URL
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  await app.listen(3001);
}
bootstrap();
