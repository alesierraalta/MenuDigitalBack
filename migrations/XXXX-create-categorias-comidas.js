'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Categorias', {
      ID_categoria: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      Nombre_categoria: {
        type: Sequelize.TEXT,
        unique: true,
        allowNull: false
      }
    });

    await queryInterface.createTable('Comidas', {
      ID_comida: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      Nombre_comida: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Descripcion_comida: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      Precio_comida: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      CategoriaId: {
        type: Sequelize.BIGINT,
        references: {
          model: 'Categorias',
          key: 'ID_categoria'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });

    await queryInterface.addConstraint('Videos', {
      fields: ['comida_id'],
      type: 'foreign key',
      name: 'Videos_comida_id_0f147242_fk_Comidas_ID_comida',
      references: {
        table: 'Comidas',
        field: 'ID_comida'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Videos', 'Videos_comida_id_0f147242_fk_Comidas_ID_comida');
    await queryInterface.dropTable('Comidas');
    await queryInterface.dropTable('Categorias');
  }
};
