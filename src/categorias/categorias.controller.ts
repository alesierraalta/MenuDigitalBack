import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
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
  create(@Body() createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    return this.categoriasService.create(createCategoriaDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateCategoriaDto: UpdateCategoriaDto): Promise<Categoria> {
    const [affectedCount, [updatedCategoria]] = await this.categoriasService.update(id, updateCategoriaDto);
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
