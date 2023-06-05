const usersController = require("../controllers/user");
const tokenController = require("../controllers/token");

const express = require("express");
const router = express.Router();

router.post("/", usersController.createUser);
router.get("/:username", tokenController.verifyToken, usersController.getUser);

module.exports = router;