const chatsController = require("../controllers/token");
const tokenController = require("../controllers/token");

const express = require("express");
const router = express.Router();

router.route("/Chats").get(tokenController.verifyToken, chatsController.getChats);
router.route("/Chats").post(tokenController.verifyToken, chatsController.postChats);

router.route("/Chats/:id").get(tokenController.verifyToken, chatsController.getChat);
router.route("/Chats/:id").delete(tokenController.verifyToken, chatsController.deleteChat);

router.route("/Chats/:id/Messages").post(tokenController.verifyToken, chatsController.addChatMessage);
router.route("/Chats/:id/Messages").get(tokenController.verifyToken, chatsController.getMessages);

module.exports = router;
