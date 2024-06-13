import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { Categoria } from './categoria.entity';

@Controller('api/categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Get()
  findAll(): Promise<Categoria[]> {
    return this.categoriasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Categoria> {
    const categoria = await this.categoriasService.findOne(id);
    if (!categoria) {
      throw new NotFoundException('Categoria not found');
    }
    return categoria;
  }

  @Post()
  create(@Body() categoria: Categoria): Promise<Categoria> {
    return this.categoriasService.create(categoria);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() categoria: Categoria): Promise<Categoria> {
    const [affectedCount, [updatedCategoria]] = await this.categoriasService.update(id, categoria);
    if (affectedCount === 0) {
      throw new NotFoundException('Categoria not found');
    }
    return updatedCategoria;
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.categoriasService.delete(id);
  }
}
