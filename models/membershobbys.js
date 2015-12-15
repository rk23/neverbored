'use strict';
module.exports = function(sequelize, DataTypes) {
  var membersHobbys = sequelize.define('membersHobbys', {
    memberId: DataTypes.INTEGER,
    hobbyId: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN,
    skill_level: DataTypes.INTEGER,
    interest: DataTypes.INTEGER,
    scraperlink: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return membersHobbys;
};