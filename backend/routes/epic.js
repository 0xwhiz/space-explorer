const express = require('express');
const router = express.Router();
const { getEpic } = require('../controllers/epicController');

router.get('/', getEpic);

module.exports = router; 