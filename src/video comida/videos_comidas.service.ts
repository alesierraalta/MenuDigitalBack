import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { VideoComida } from './video_comida.entity';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Express } from 'express';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class VideosComidasService {
  constructor(
    @InjectModel(VideoComida)
    private readonly videoComidaModel: typeof VideoComida,
    private readonly httpService: HttpService,
  ) {}

  async uploadVideo(file: Express.Multer.File): Promise<string> {
    const response: AxiosResponse = await firstValueFrom(
      this.httpService.post(
        'https://api.vimeo.com/me/videos',
        {
          upload: {
            approach: 'tus',
            size: file.size,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.VIMEO_ACCESS_TOKEN}`,
            'Tus-Resumable': '1.0.0',
          },
        },
      ),
    );

    const uploadUrl = response.data.upload.upload_link;

    await firstValueFrom(
      this.httpService.patch(uploadUrl, file.buffer, {
        headers: {
          'Tus-Resumable': '1.0.0',
          'Upload-Offset': '0',
          'Content-Type': 'application/offset+octet-stream',
          'Content-Length': file.size.toString(),
        },
      }),
    );

    return response.data.link;  // La URL del video subido
  }

  async createVideo(id_comida: number, videoUrl: string): Promise<VideoComida> {
    // Añade un cast explícito para evitar errores de tipo
    return this.videoComidaModel.create({
      id_comida,
      video_url: videoUrl,
    } as VideoComida);
  }

  async findVideosByComidaId(id_comida: number): Promise<VideoComida[]> {
    return this.videoComidaModel.findAll({ where: { id_comida } });
  }
}
