const express = require('express');
const router = express.Router();
const { HomePage } = require('../controllers/indexController');

// Root endpoint
router.get('/', HomePage);

module.exports = router;
