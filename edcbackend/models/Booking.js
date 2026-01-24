const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');

const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isEmail: true },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  propertyType: {
    type: DataTypes.ENUM('domestic', 'commercial'),
    allowNull: false,
  },
  propertyDetails: {
    type: DataTypes.STRING,
  },
  postcode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  propertyAddress: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  preferredDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'completed', 'cancelled'),
    defaultValue: 'pending',
  },
}, {
  tableName: 'bookings',
  timestamps: true,
  underscored: true,   // 🔥 REQUIRED
});

module.exports = Booking;
