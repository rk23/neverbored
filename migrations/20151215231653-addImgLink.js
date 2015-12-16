'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.addColumn(
     'members',
     'imgLink', Sequelize.STRING);
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.removeColumn('members','imgLink');
  }
};
