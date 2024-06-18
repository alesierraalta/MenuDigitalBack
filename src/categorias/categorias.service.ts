import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Categoria } from './categoria.entity';

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

  async create(categoria: Categoria): Promise<Categoria> {
    try {
      return await this.categoriaModel.create(categoria);
    } catch (error) {
      throw new Error(`Error creating category: ${(error as Error).message}`);
    }
  }

  async update(id: number, categoria: Categoria): Promise<[number, Categoria[]]> {
    try {
      return await this.categoriaModel.update(categoria, {
        where: { id_categoria: id },
        returning: true,
      });
    } catch (error) {
      throw new Error(`Error updating category: ${(error as Error).message}`);
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
