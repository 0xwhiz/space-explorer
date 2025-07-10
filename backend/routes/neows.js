const express = require('express');
const router = express.Router();
const { getNeoWs } = require('../controllers/neowsController');

router.get('/', getNeoWs);

module.exports = router; 