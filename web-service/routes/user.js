const usersController = require("../controllers/user");
const tokenController = require("../controllers/token");

const express = require("express");
const router = express.Router();

router.route("/").post(usersController.createUser);
router.route("/:username").get(tokenController.verifyToken, usersController.getUser);

module.exports = router;