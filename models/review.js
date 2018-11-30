'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    ratingValue: DataTypes.INTEGER,
    comment: DataTypes.TEXT
  }, {});
  Review.associate = function(models) {
    Review.belongsTo(models.Job);
  };
  return Review;
};