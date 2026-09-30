const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');

const BulkOrder = sequelize.define('BulkOrder', {
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
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  propertyType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numberOfProperties: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  postcodes: {
    type: DataTypes.STRING,
  },
  additionalInfo: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.ENUM('new', 'contacted', 'quoted', 'completed'),
    defaultValue: 'new',
  },
}, {
  tableName: 'bulk_orders',
  timestamps: true,
  underscored: true,
});

module.exports = BulkOrder;