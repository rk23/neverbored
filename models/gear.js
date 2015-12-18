'use strict';
module.exports = function(sequelize, DataTypes) {
  var gear = sequelize.define('gear', {
    name: DataTypes.STRING,
    value: DataTypes.FLOAT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.gear.belongsToMany(models.member, {through: { model: 'membersGear'}});
          models.gear.belongsToMany(models.member, {
              through: {
                  model: 'membersGear',
                  unique: false,
                  scope: {
                      forSale: true
                  }
              },
              as: 'forSale'
          });
      }
    }
  });
  return gear;
};