import { Controller, Get, Post, Put, Delete, Body, Param, Query, NotFoundException } from '@nestjs/common';
import { ComidasService } from './comidas.service';
import { Comida } from './comida.entity';

@Controller('api/comidas')
export class ComidasController {
  constructor(private readonly comidasService: ComidasService) {}

  @Get()
  findAll(): Promise<Comida[]> {
    return this.comidasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Comida> {
    const comida = await this.comidasService.findOne(id);
    if (!comida) {
      throw new NotFoundException('Comida not found');
    }
    return comida;
  }

  @Get('categoria/:id_categoria')
  findByCategoria(@Param('id_categoria') id_categoria: number): Promise<Comida[]> {
    return this.comidasService.findByCategoria(id_categoria);
  }

  @Get('buscar')
  findByName(@Query('name') name: string): Promise<Comida[]> {
    return this.comidasService.findByName(name);
  }

  @Post()
  create(@Body() comida: Comida): Promise<Comida> {
    return this.comidasService.create(comida);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() comida: Comida): Promise<Comida> {
    const [affectedCount, [updatedComida]] = await this.comidasService.update(id, comida);
    if (affectedCount === 0) {
      throw new NotFoundException('Comida not found');
    }
    return updatedComida;
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.comidasService.delete(id);
  }
}
