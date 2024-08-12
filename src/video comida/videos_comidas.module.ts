import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { VideosComidasService } from './videos_comidas.service';
import { VideosComidasController } from './videos_comidas.controller';
import { VideoComida } from './video_comida.entity';
import { Comida } from '../comidas/comida.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    SequelizeModule.forFeature([VideoComida, Comida]),
    HttpModule,  // Importa HttpModule para usar HttpService
  ],
  controllers: [VideosComidasController],
  providers: [VideosComidasService],
})
export class VideosComidasModule {}
