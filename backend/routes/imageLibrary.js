const express = require('express');
const router = express.Router();
const { getImageLibrary } = require('../controllers/imageLibraryController');

router.get('/', getImageLibrary);

module.exports = router; 