const usersController = require('../controllers/user');

const express = require('express');
const router = express.Router();

router.route('/').post(usersController.createUser);
router.route('/:username').get(usersController.getUser);

module.exports = router;