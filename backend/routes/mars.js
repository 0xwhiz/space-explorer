const express = require('express');
const router = express.Router();
const { getMarsPhotos } = require('../controllers/marsController');

router.get('/', getMarsPhotos);

module.exports = router; 