import { Table, Column, Model, DataType } from 'sequelize-typescript';

// Define the 'categorias' table using the Sequelize ORM
@Table({
  tableName: 'categorias',  // Specify the table name
  timestamps: false,        // Disable automatic creation of timestamp fields (createdAt, updatedAt)
})
export class Categoria extends Model<Categoria> {
  // Define the 'id_categoria' column as an integer, primary key, and auto-incrementing
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,  
  })
  id_categoria?: number;

  // Define the 'nombre_categoria' column as a string and make it a required field
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nombre_categoria?: string;

  // Define the 'imagen_url' column as a string and make it an optional field
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  imagen_url?: string; // URL of the image associated with the category
}
