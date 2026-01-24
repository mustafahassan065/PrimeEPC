const express = require('express');
const router = express.Router();

// Simple auth check route
router.get('/check', (req, res) => {
  res.json({
    success: true,
    message: 'Auth routes are working',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;