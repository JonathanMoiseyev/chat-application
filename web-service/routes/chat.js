const chatsController = require("../controllers/chat");
const tokenController = require("../controllers/token");

const express = require("express");
const router = express.Router();

router.get("/Chats", tokenController.verifyToken, chatsController.getChats);
router.post("/Chats", tokenController.verifyToken, chatsController.createChat);

router.get("/Chats/:id", tokenController.verifyToken, chatsController.getChat);
router.delete("/Chats/:id", tokenController.verifyToken, chatsController.deleteChat);

router.post("/Chats/:id/Messages", tokenController.verifyToken, chatsController.addChatMessage);
router.get("/Chats/:id/Messages", tokenController.verifyToken, chatsController.getChatMessage);

module.exports = router;
