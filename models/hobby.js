'use strict';
module.exports = function(sequelize, DataTypes) {
  var hobby = sequelize.define('hobby', {
    name: DataTypes.STRING,
    verbed: DataTypes.STRING,
    time: DataTypes.INTEGER,
    short_desc: DataTypes.STRING,
    transport: DataTypes.BOOLEAN,
    solo: DataTypes.BOOLEAN,
    quote: DataTypes.STRING,
    imglink: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.hobby.hasMany(models.member);
      }
    }
  });
  return hobby;
};