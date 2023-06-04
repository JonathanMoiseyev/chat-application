const tokenController = require('../controllers/token');

const express = require('express');
const router = express.Router();

router.route('/').post(tokenController.createToken);

module.exports = router;