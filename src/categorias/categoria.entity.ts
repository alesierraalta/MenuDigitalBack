import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'categorias',
  timestamps: false,
})
export class Categoria extends Model<Categoria> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id_categoria?: number;  // Update to match the database column name

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nombre_categoria? : string;  // Update to match the database column name
}
