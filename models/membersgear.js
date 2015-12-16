'use strict';
module.exports = function(sequelize, DataTypes) {
  var membersGear = sequelize.define('membersGear', {
    memberId: DataTypes.INTEGER,
    gearId: DataTypes.INTEGER,
    wanted: DataTypes.BOOLEAN,
    forSale: DataTypes.BOOLEAN,
    hobbyId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return membersGear;
};