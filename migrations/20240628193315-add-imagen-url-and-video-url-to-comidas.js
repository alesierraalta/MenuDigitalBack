'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Comidas', 'imagen_url', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Comidas', 'video_url', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Comidas', 'imagen_url');
    await queryInterface.removeColumn('Comidas', 'video_url');
  }
};
