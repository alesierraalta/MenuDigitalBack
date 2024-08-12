import { Controller, Post, Param, UploadedFile, UseInterceptors, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagenesCategoriasService } from './imagenes_categorias.service';
import { ImagenCategoria } from './imagen_categoria.entity';
import { Express } from 'express';
import * as multer from 'multer';


@Controller('api/categorias/:id/imagenes')
export class ImagenesCategoriasController {
  constructor(private readonly imagenesCategoriasService: ImagenesCategoriasService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @Param('id') id_categoria: number,
    @UploadedFile() file: Express.Multer.File,  // Usando Express.Multer.File correctamente
  ): Promise<ImagenCategoria> {
    const imageUrl = await this.imagenesCategoriasService.uploadImage(file);
    return this.imagenesCategoriasService.createImage(id_categoria, imageUrl);
  }

  @Get()
  async getImages(@Param('id') id_categoria: number): Promise<ImagenCategoria[]> {
    return this.imagenesCategoriasService.findImagesByCategoriaId(id_categoria);
  }
}
