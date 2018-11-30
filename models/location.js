'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    street: DataTypes.STRING
  }, {});
  Location.associate = function(models) {
    Location.belongsTo(models.Stylist);
  };
  return Location;
};