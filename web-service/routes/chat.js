const chatsController = require('../controllers/token');

const express = require('express');
const router = express.Router();

router.route('/Chats').get(chatsController.getChats);
router.route('/Chats').post(chatsController.postChats);

router.route('/Chats/:id').get(chatsController.getChat);
router.route('/Chats/:id').delete(chatsController.deleteChat);

router.route('/Chats/:id/Messages').post(chatsController.addChatMessage);
router.route('/Chats/:id/Messages').get(chatsController.getMessages);

module.exports = router;
