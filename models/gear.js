'use strict';
module.exports = function(sequelize, DataTypes) {
  var gear = sequelize.define('gear', {
    name: DataTypes.STRING,
    value: DataTypes.FLOAT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.gear.belongsToMany(models.member, {through: 'membersGear'});
      }
    }
  });
  return gear;
};