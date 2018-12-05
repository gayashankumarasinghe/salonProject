'use strict';
module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define('Schedule', {
    scheduleDate: DataTypes.DATEONLY,
    timeSlot: DataTypes.ENUM('D1','D2','E1','E2'),
    scheduleStatus: DataTypes.ENUM('Booked','Busy','Available','Pending')
  }, {});
  Schedule.associate = function(models) {
    Schedule.belongsTo(models.Stylist);
    Schedule.belongsTo(models.Job);
  };
  return Schedule;
};