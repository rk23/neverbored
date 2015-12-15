'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('hobbys', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      verbed: {
        type: Sequelize.STRING
      },
      time: {
        type: Sequelize.INTEGER
      },
      short_desc: {
        type: Sequelize.STRING
      },
      transport: {
        type: Sequelize.BOOLEAN
      },
      solo: {
        type: Sequelize.BOOLEAN
      },
      quote: {
        type: Sequelize.STRING
      },
      imglink: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('hobbys');
  }
};