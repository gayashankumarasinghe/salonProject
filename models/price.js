'use strict';
module.exports = (sequelize, DataTypes) => {
  const Price = sequelize.define('Price', {
    dayPrice: DataTypes.FLOAT(6,2),
    eveningPrice: DataTypes.FLOAT(6,2)
  }, {});
  Price.associate = function(models) {
    Price.belongsTo(models.Stylist);
  };
  return Price;
};