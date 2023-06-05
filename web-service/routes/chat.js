const chatsController = require("../controllers/chat");
const tokenController = require("../controllers/token");

const express = require("express");
const router = express.Router();

router.get("/", tokenController.verifyToken, chatsController.getChats);
router.post("/", tokenController.verifyToken, chatsController.createChat);

router.get("/:id", tokenController.verifyToken, chatsController.getChat);
router.delete("/:id", tokenController.verifyToken, chatsController.deleteChat);

router.post("/:id/Messages", tokenController.verifyToken, chatsController.addChatMessage);
router.get("/:id/Messages", tokenController.verifyToken, chatsController.getChatMessage);

module.exports = router;
