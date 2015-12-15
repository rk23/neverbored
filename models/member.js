'use strict';
module.exports = function(sequelize, DataTypes) {
  var member = sequelize.define('member', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    zip: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.member.hasMany(models.hobby);
      }
    }
  });
  return member;
};