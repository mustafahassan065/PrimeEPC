const express = require('express');
const jwt = require('jsonwebtoken');
const Blog = require('../models/Blog');
const Admin = require('../models/Admin');
const auth = require('../middleware/auth');
const router = express.Router();

// ✅ ADD CHECK ROUTE
router.get('/check', (req, res) => {
  res.json({
    success: true,
    message: 'Admin routes are working!',
    timestamp: new Date().toISOString()
  });
});

// Admin Login - FIXED
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('🔐 Login attempt for:', email);
    
    // ✅ FIX: Use Sequelize syntax
    const admin = await Admin.findOne({ where: { email } });
    if (!admin || !(await admin.correctPassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    // ✅ FIX: Use 'id' instead of '_id'
    const token = jwt.sign(
      { id: admin.id }, 
      process.env.JWT_SECRET || 'fallback_secret', 
      { expiresIn: '7d' }
    );
    
    res.json({
      success: true,
      token,
      admin: { 
        id: admin.id, 
        email: admin.email, 
        name: admin.name 
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed'
    });
  }
});

// Create Blog (Protected) - FIXED
router.post('/blogs', auth, async (req, res) => {
  try {
    const { title, content } = req.body;
    
    // ✅ FIX: Use Sequelize create method
    const blog = await Blog.create({
      title,
      content,
      author: 'Admin',
      status: 'published',
      // Auto-generate required fields
      slug: title.toLowerCase().replace(/[^a-zA-Z0-9 -]/g, '').replace(/\s+/g, '-'),
      metaTitle: title,
      metaDescription: content.substring(0, 160),
      excerpt: content.substring(0, 300),
      featuredImage: '',
      keywords: []
    });
    
    res.status(201).json({
      success: true,
      data: blog
    });
  } catch (error) {
    console.error('Create blog error:', error);
    res.status(400).json({
      success: false,
      message: 'Error creating blog'
    });
  }
});

// Update Blog (Protected) - FIXED
router.put('/blogs/:id', auth, async (req, res) => {
  try {
    // ✅ FIX: Use Sequelize findByPk and update
    const blog = await Blog.findByPk(req.params.id);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }
    
    await blog.update(req.body);
    
    res.json({
      success: true,
      data: blog
    });
  } catch (error) {
    console.error('Update blog error:', error);
    res.status(400).json({
      success: false,
      message: 'Error updating blog'
    });
  }
});

// Delete Blog (Protected) - FIXED
router.delete('/blogs/:id', auth, async (req, res) => {
  try {
    // ✅ FIX: Use Sequelize findByPk and destroy
    const blog = await Blog.findByPk(req.params.id);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }
    
    await blog.destroy();
    
    res.json({
      success: true,
      message: 'Blog deleted successfully'
    });
  } catch (error) {
    console.error('Delete blog error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting blog'
    });
  }
});

// Get all blogs for admin (Protected) - FIXED
router.get('/blogs', auth, async (req, res) => {
  try {
    // ✅ FIX: Use Sequelize findAll
    const blogs = await Blog.findAll({ 
      order: [['createdAt', 'DESC']] 
    });
    
    res.json({
      success: true,
      data: blogs
    });
  } catch (error) {
    console.error('Fetch blogs error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching blogs'
    });
  }
});

module.exports = router;