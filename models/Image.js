'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    imageType: DataTypes.ENUM('ProfileImage','GalleryImage'),
    imageUrl: DataTypes.STRING
  }, {});
  Image.associate = function(models) {
    Image.belongsTo(models.Stylist);
  };
  return Image;
};