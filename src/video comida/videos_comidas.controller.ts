import { Controller, Post, Param, UploadedFile, UseInterceptors, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { VideosComidasService } from './videos_comidas.service';
import { VideoComida } from './video_comida.entity';
import { Express } from 'express';

@Controller('api/comidas/:id/videos')
export class VideosComidasController {
  constructor(private readonly videosComidasService: VideosComidasService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadVideo(
    @Param('id') id_comida: number,
    @UploadedFile() file: Express.Multer.File,  // Usando Express.Multer.File correctamente
  ): Promise<VideoComida> {
    const videoUrl = await this.videosComidasService.uploadVideo(file);
    return this.videosComidasService.createVideo(id_comida, videoUrl);
  }

  @Get()
  async getVideos(@Param('id') id_comida: number): Promise<VideoComida[]> {
    return this.videosComidasService.findVideosByComidaId(id_comida);
  }
}
