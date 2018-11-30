'use strict';
module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define('Job', {
    jobStatus: DataTypes.ENUM('Pending','Completed'),
    salonName: DataTypes.STRING
  }, {});
  Job.associate = function(models) {
    Job.belongsTo(models.Stylist);
    Job.hasOne(models.Review);
    Job.hasMany(models.Schedule);
  };
  return Job;
};