'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('categorias', 'imagen_url', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('comidas', 'imagen_url', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('comidas', 'video_url', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('categorias', 'imagen_url');
    await queryInterface.removeColumn('comidas', 'imagen_url');
    await queryInterface.removeColumn('comidas', 'video_url');
  }
};
