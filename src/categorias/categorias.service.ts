import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Categoria } from './categoria.entity';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectModel(Categoria)
    private readonly categoriaModel: typeof Categoria,
  ) {}

  async findAll(): Promise<Categoria[]> {
    try {
      return await this.categoriaModel.findAll();
    } catch (error) {
      throw new Error(`Error fetching all categories: ${(error as Error).message}`);
    }
  }

  async findOne(id: number): Promise<Categoria> {
    try {
      const categoria = await this.categoriaModel.findOne({ where: { id_categoria: id } });
      if (!categoria) {
        throw new NotFoundException('Categoria not found');
      }
      return categoria;
    } catch (error) {
      throw new Error(`Error fetching category: ${(error as Error).message}`);
    }
  }

  async create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    try {
      return await this.categoriaModel.create(createCategoriaDto as any);
    } catch (error) {
      throw new BadRequestException(`Error creating category: ${(error as Error).message}`);
    }
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto): Promise<[number, Categoria[]]> {
    try {
      const [affectedCount, updatedCategoria] = await this.categoriaModel.update(updateCategoriaDto, {
        where: { id_categoria: id },
        returning: true,
      });
      if (affectedCount === 0) {
        throw new NotFoundException('Categoria not found');
      }
      return [affectedCount, updatedCategoria];
    } catch (error) {
      throw new BadRequestException(`Error updating category: ${(error as Error).message}`);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const categoria = await this.findOne(id);
      if (!categoria) {
        throw new NotFoundException('Categoria not found');
      }
      await categoria.destroy();
    } catch (error) {
      throw new Error(`Error deleting category: ${(error as Error).message}`);
    }
  }
}
