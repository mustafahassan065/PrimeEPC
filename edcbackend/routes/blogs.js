const express = require('express');
const Blog = require('../models/Blog');
const router = express.Router();

// GET all published blogs
router.get('/', async (req, res) => {
  try {
    console.log('📝 Fetching blogs from database...');
    
    const blogs = await Blog.findAll({
      where: { status: 'published' },
      order: [['createdAt', 'DESC']]
    });
    
    console.log(`✅ Found ${blogs.length} blogs`);
    
    res.json({
      success: true,
      data: blogs
    });
    
  } catch (error) {
    console.error('❌ Error in /api/blogs:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching blogs: ' + error.message
    });
  }
});

// GET single blog by slug - FIXED
router.get('/:slug', async (req, res) => {
  try {
    console.log(`🔍 Fetching blog with slug: ${req.params.slug}`);
    
    const blog = await Blog.findOne({ 
      where: { 
        slug: req.params.slug
      } 
    });
    
    console.log('Blog found:', blog ? blog.title : 'None');
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }
    
    res.json({
      success: true,
      data: blog
    });
  } catch (error) {
    console.error('❌ Error fetching blog:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching blog: ' + error.message
    });
  }
});

module.exports = router;