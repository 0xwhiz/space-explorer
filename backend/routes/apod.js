const express = require('express');
const router = express.Router();
const { getApod } = require('../controllers/apodController');

router.get('/', getApod);

module.exports = router; 