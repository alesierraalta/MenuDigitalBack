import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ImagenComida } from './imagen_comida.entity';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Express } from 'express';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ImagenesComidasService {
  constructor(
    @InjectModel(ImagenComida)
    private readonly imagenComidaModel: typeof ImagenComida,
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

  async createImage(id_comida: number, imageUrl: string): Promise<ImagenComida> {
    // Añade un cast explícito para evitar errores de tipo
    return this.imagenComidaModel.create({
      id_comida,
      imagen_url: imageUrl,
    } as ImagenComida);
  }

  async findImagesByComidaId(id_comida: number): Promise<ImagenComida[]> {
    return this.imagenComidaModel.findAll({ where: { id_comida } });
  }
}
