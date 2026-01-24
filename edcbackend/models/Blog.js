// models/Blog.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');

const Blog = sequelize.define('Blog', {
  title: { type: DataTypes.STRING, allowNull: false },
  slug: { type: DataTypes.STRING, unique: true, allowNull: false },
  meta_title: { type: DataTypes.STRING, allowNull: false },
  meta_description: { type: DataTypes.STRING, allowNull: false },
  keywords: { type: DataTypes.TEXT },
  content: { type: DataTypes.TEXT, allowNull: false },
  featured_image: { type: DataTypes.STRING, defaultValue: '' },
  excerpt: { type: DataTypes.STRING(300) },
  status: { type: DataTypes.STRING, defaultValue: 'published' },
  author: { type: DataTypes.STRING, defaultValue: 'Prime EPC' }
}, {
  tableName: 'blogs',
  underscored: true, // ✅ this ensures Sequelize uses created_at / updated_at
});

module.exports = Blog;