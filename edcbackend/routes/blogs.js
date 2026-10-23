const express = require('express');
const { Op } = require('sequelize');
const Blog = require('../models/Blog');
const router = express.Router();

function parseKeywords(raw) {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      return raw.split(',').map(s => s.trim()).filter(Boolean);
    }
  }
  return [];
}

// GET all published blogs (supports ?keyword=, ?q=, ?tag=, ?search=)
router.get('/', async (req, res) => {
  try {
    const { keyword, q, tag, search } = req.query;
    const term = (keyword || q || tag || search || '').trim();

    const where = { status: 'published' };
    if (term) {
      const pattern = `%${term}%`;
      where[Op.or] = [
        { title: { [Op.iLike]: pattern } },
        { keywords: { [Op.iLike]: pattern } },
        { meta_description: { [Op.iLike]: pattern } },
        { excerpt: { [Op.iLike]: pattern } },
        { content: { [Op.iLike]: pattern } },
      ];
    }

    const blogs = await Blog.findAll({
      where,
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      count: blogs.length,
      searchTerm: term || null,
      data: blogs
    });
  } catch (error) {
    console.error('Error in /api/blogs:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching blogs: ' + error.message
    });
  }
});

// GET list of all targeted keywords across published blogs
router.get('/meta/keywords', async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      where: { status: 'published' },
      attributes: ['keywords']
    });

    const set = new Set();
    blogs.forEach(b => {
      parseKeywords(b.keywords).forEach(k => set.add(k));
    });

    res.json({
      success: true,
      count: set.size,
      keywords: Array.from(set)
    });
  } catch (error) {
    console.error('Error fetching keywords:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching keywords: ' + error.message
    });
  }
});

// GET single blog by slug
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ 
      where: { slug: req.params.slug } 
    });

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
    console.error('Error fetching blog:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching blog: ' + error.message
    });
  }
});

module.exports = router;
