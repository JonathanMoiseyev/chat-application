const tokenController = require('../controllers/tokens');

const express = require('express');
const router = express.Router();

router.route('/').post(tokenController.createToken);

module.exports = router;