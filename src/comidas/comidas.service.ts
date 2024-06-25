import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comida } from './comida.entity';
import { Op } from 'sequelize';

@Injectable()
export class ComidasService {
  constructor(
    @InjectModel(Comida)
    private readonly comidaModel: typeof Comida,
  ) {}

  async findAll(): Promise<Comida[]> {
    try {
      return await this.comidaModel.findAll();
    } catch (error) {
      throw new Error(`Error fetching all comidas: ${(error as Error).message}`);
    }
  }

  async findOne(id: number): Promise<Comida> {
    try {
      const comida = await this.comidaModel.findByPk(id);
      if (!comida) {
        throw new NotFoundException('Comida not found');
      }
      return comida;
    } catch (error) {
      throw new Error(`Error fetching comida: ${(error as Error).message}`);
    }
  }

  async findByCategoria(id_categoria: number): Promise<Comida[]> {
    try {
      return await this.comidaModel.findAll({ where: { id_categoria } });
    } catch (error) {
      throw new Error(`Error fetching comidas by category: ${(error as Error).message}`);
    }
  }

  async findByName(name: string): Promise<Comida[]> {
    try {
      return await this.comidaModel.findAll({
        where: {
          nombre_comida: {
            [Op.iLike]: `%${name}%`,
          },
        },
      });
    } catch (error) {
      throw new Error(`Error fetching comidas by name: ${(error as Error).message}`);
    }
  }

  async create(comida: Comida): Promise<Comida> {
    try {
      return await this.comidaModel.create(comida);
    } catch (error) {
      throw new Error(`Error creating comida: ${(error as Error).message}`);
    }
  }

  async update(id: number, comida: Comida): Promise<[number, Comida[]]> {
    try {
      return await this.comidaModel.update(comida, {
        where: { id_comida: id },
        returning: true,
      });
    } catch (error) {
      throw new Error(`Error updating comida: ${(error as Error).message}`);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const comida = await this.findOne(id);
      if (!comida) {
        throw new NotFoundException('Comida not found');
      }
      await comida.destroy();
    } catch (error) {
      throw new Error(`Error deleting comida: ${(error as Error).message}`);
    }
  }
}
