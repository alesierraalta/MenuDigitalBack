import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Comida } from '../comidas/comida.entity';

@Table({
  tableName: 'videos_comidas',
  timestamps: false,
})
export class VideoComida extends Model<VideoComida> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id_video!: number;

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
  video_url!: string;

  @BelongsTo(() => Comida)
  comida!: Comida; // Uso de '!' para indicar que será asignada después
}
