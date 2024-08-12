import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ImagenesComidasService } from './imagenes_comidas.service';
import { ImagenesComidasController } from './imagenes_comidas.controller';
import { ImagenComida } from './imagen_comida.entity';
import { Comida } from '../comidas/comida.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    SequelizeModule.forFeature([ImagenComida, Comida]),
    HttpModule,  // Importa HttpModule para usar HttpService
  ],
  controllers: [ImagenesComidasController],
  providers: [ImagenesComidasService],
})
export class ImagenesComidasModule {}
