import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Categoria } from '../categorias/categoria.entity';

@Table({
  tableName: 'imagenes_categorias',
  timestamps: false,
})
export class ImagenCategoria extends Model<ImagenCategoria> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id_imagen!: number;

  @ForeignKey(() => Categoria)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id_categoria!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  imagen_url!: string;

  @BelongsTo(() => Categoria)
  categoria!: Categoria; // Uso de '!' para indicar que será asignada después
}
