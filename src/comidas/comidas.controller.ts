import { Controller, Get, Post, Put, Delete, Body, Param, Query, NotFoundException } from '@nestjs/common';
import { ComidasService } from './comidas.service';
import { CreateComidaDto } from './dto/create-comida.dto';
import { UpdateComidaDto } from './dto/update-comida.dto';
import { Comida } from './comida.entity';

@Controller('api/comidas')
export class ComidasController {
  constructor(private readonly comidasService: ComidasService) {}

  // GET /api/comidas
  // Retrieve all comidas
  @Get()
  findAll(): Promise<Comida[]> {
    return this.comidasService.findAll();
  }

  // GET /api/comidas/:id
  // Retrieve a single comida by ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Comida> {
    const comida = await this.comidasService.findOne(id);
    if (!comida) {
      throw new NotFoundException('Comida not found');
    }
    return comida;
  }

  // GET /api/comidas/categoria/:id_categoria
  // Retrieve comidas by category ID
  @Get('categoria/:id_categoria')
  findByCategoria(@Param('id_categoria') id_categoria: number): Promise<Comida[]> {
    return this.comidasService.findByCategoria(id_categoria);
  }

  // GET /api/comidas/buscar?name=...
  // Search comidas by name
  @Get('buscar')
  findByName(@Query('name') name: string): Promise<Comida[]> {
    return this.comidasService.findByName(name);
  }

  // POST /api/comidas
  // Create a new comida
  @Post()
  create(@Body() createComidaDto: CreateComidaDto): Promise<Comida> {
    return this.comidasService.create(createComidaDto);
  }

  // PUT /api/comidas/:id
  // Update an existing comida by ID
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateComidaDto: UpdateComidaDto): Promise<Comida> {
    const [affectedCount, [updatedComida]] = await this.comidasService.update(id, updateComidaDto);
    if (affectedCount === 0) {
      throw new NotFoundException('Comida not found');
    }
    return updatedComida;
  }

  // DELETE /api/comidas/:id
  // Delete a comida by ID
  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.comidasService.delete(id);
  }
}
