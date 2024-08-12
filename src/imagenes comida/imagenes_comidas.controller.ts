import { Controller, Post, Param, UploadedFile, UseInterceptors, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagenesComidasService } from './imagenes_comidas.service';
import { ImagenComida } from './imagen_comida.entity';
import { Express } from 'express';

@Controller('api/comidas/:id/imagenes')
export class ImagenesComidasController {
  constructor(private readonly imagenesComidasService: ImagenesComidasService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @Param('id') id_comida: number,
    @UploadedFile() file: Express.Multer.File,  // Usando Express.Multer.File correctamente
  ): Promise<ImagenComida> {
    const imageUrl = await this.imagenesComidasService.uploadImage(file);
    return this.imagenesComidasService.createImage(id_comida, imageUrl);
  }

  @Get()
  async getImages(@Param('id') id_comida: number): Promise<ImagenComida[]> {
    return this.imagenesComidasService.findImagesByComidaId(id_comida);
  }
}
