'use strict';
module.exports = function(sequelize, DataTypes) {
    var bcrypt = require('bcrypt');

    var member = sequelize.define('member', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    zip: DataTypes.INTEGER,
    imgLink: DataTypes.STRING
  }, {
    classMethods: {
        associate: function (models) {
            // associations can be defined here
            models.member.belongsToMany(models.hobby, {through: 'membersHobbys'});
            models.member.belongsToMany(models.gear, {through: 'membersGears'});
        }
    },
        hooks: {
            beforeCreate: function(member, o, cb) {
                bcrypt.hash(member.password, 1, function(err, hash) {
                    member.password = hash;
                    cb(null, member);
                });
            }
        }
  });
  return member;
};