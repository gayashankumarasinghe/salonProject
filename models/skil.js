'use strict';
module.exports = (sequelize, DataTypes) => {
  const Skil = sequelize.define('Skil', {
    skilDescription: DataTypes.STRING
  }, {});
  Skil.associate = function(models) {
    Skil.belongsToMany(models.Stylist,{through:'stylist-skill'});
  };
  return Skil;
};