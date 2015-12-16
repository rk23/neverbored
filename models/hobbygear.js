'use strict';
module.exports = function(sequelize, DataTypes) {
  var hobbyGear = sequelize.define('hobbyGear', {
    hobbyId: DataTypes.INTEGER,
    gearId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return hobbyGear;
};