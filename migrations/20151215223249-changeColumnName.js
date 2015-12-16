'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.renameColumn('membersGears', 'userId', 'memberId');

  },

  down: function (queryInterface, Sequelize) {

      return queryInterface.renameColumn('membersGears', 'memberId', 'userId');


  }
};
