import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ImagenesCategoriasService } from './imagenes_categorias.service';
import { ImagenesCategoriasController } from './imagenes_categorias.controller';
import { ImagenCategoria } from './imagen_categoria.entity';
import { Categoria } from '../categorias/categoria.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    SequelizeModule.forFeature([ImagenCategoria, Categoria]),
    HttpModule,
  ],
  controllers: [ImagenesCategoriasController],
  providers: [ImagenesCategoriasService],
})
export class ImagenesCategoriasModule {}
