import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ComidasController } from './comidas.controller';
import { ComidasService } from './comidas.service';
import { Comida } from './comida.entity';

@Module({
  imports: [SequelizeModule.forFeature([Comida])],
  controllers: [ComidasController],
  providers: [ComidasService],
})
export class ComidasModule {}
