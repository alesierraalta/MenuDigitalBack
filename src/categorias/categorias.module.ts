import { Module } from '@nestjs/common';
import { CategoriasController } from './categorias.controller';
import { CategoriasService } from './categorias.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Categoria } from './categoria.entity';

@Module({
  imports: [SequelizeModule.forFeature([Categoria])],
  controllers: [CategoriasController],
  providers: [CategoriasService],
})
export class CategoriasModule {}
