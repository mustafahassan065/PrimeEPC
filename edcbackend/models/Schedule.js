const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');

const Schedule = sequelize.define('Schedule', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  startTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  maxBookings: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  currentBookings: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  tableName: 'schedules',
  timestamps: true,
  underscored: true,   // 🔥 MOST IMPORTANT

  indexes: [
    {
      unique: true,
      fields: ['date', 'start_time'] // 🔥 DB column name
    }
  ]
});

module.exports = Schedule;
