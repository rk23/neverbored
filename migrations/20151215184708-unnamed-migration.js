'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

      return queryInterface.renameColumn('membersGears', 'equipmentId', 'gearId');

  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.renameColumn('membersGears', 'gearId', 'equipmentId');

  }
};
