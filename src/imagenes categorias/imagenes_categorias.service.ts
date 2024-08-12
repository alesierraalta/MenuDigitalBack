import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ImagenCategoria } from './imagen_categoria.entity';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Express } from 'express';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ImagenesCategoriasService {
  constructor(
    @InjectModel(ImagenCategoria)
    private readonly imagenCategoriaModel: typeof ImagenCategoria,
    private readonly httpService: HttpService,
  ) {}

  async uploadImage(file: Express.Multer.File): Promise<string> {
    const formData = new FormData();
    formData.append('image', file.buffer.toString('base64'));

    const response: AxiosResponse = await firstValueFrom(
      this.httpService.post('https://api.imgur.com/3/image', formData, {
        headers: {
          Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
        },
      }),
    );

    return response.data.data.link;  // La URL de la imagen subida
  }

  async createImage(id_categoria: number, imageUrl: string): Promise<ImagenCategoria> {
    // Añade un cast explícito para evitar errores de tipo
    return this.imagenCategoriaModel.create({
      id_categoria,
      imagen_url: imageUrl,
    } as ImagenCategoria);
  }

  async findImagesByCategoriaId(id_categoria: number): Promise<ImagenCategoria[]> {
    return this.imagenCategoriaModel.findAll({ where: { id_categoria } });
  }
}
