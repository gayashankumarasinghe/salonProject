'use strict';
module.exports = (sequelize, DataTypes) => {
  const Stylist = sequelize.define('Stylist', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    fburl: DataTypes.STRING,
    description: DataTypes.TEXT,
    gender: DataTypes.ENUM('Male','Female'),
    stylistType: DataTypes.ENUM('Stylist','Educator'),
    rating: DataTypes.FLOAT(2,1),
  }, {});
  Stylist.associate = function(models) {
    Stylist.hasMany(models.Job);
    Stylist.hasMany(models.Image);
      Stylist.hasOne(models.Location);
      Stylist.belongsToMany(models.Skil,{through:'stylist-skill'});
      Stylist.hasOne(models.Price);
      Stylist.hasMany(models.Schedule);
  };
  return Stylist;
};
