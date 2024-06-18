import { Table, Column, Model, ForeignKey, DataType } from 'sequelize-typescript';
import { Categoria } from '../categorias/categoria.entity';

@Table({
  tableName: 'comidas',
  timestamps: false,
})
export class Comida extends Model<Comida> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,  // Este campo debe ser auto-incremental
    primaryKey: true,
  })
  id_comida?: number;

  @ForeignKey(() => Categoria)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id_categoria?: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nombre_comida?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  descripcion_comida?: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  precio_comida?: number;
}
