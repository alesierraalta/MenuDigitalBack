import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Comida } from '../comidas/comida.entity';

@Table({
  tableName: 'imagenes_comidas',
  timestamps: false,
})
export class ImagenComida extends Model<ImagenComida> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id_imagen!: number;

  @ForeignKey(() => Comida)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id_comida!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  imagen_url!: string;

  @BelongsTo(() => Comida)
  comida!: Comida; // Uso de '!' para indicar que será asignada después
}
