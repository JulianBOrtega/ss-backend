const express = require('express');
const router = express.Router();
const { 
    getAllChats, getChats,
    addChat, removeChat,
    clearChatHistory
} = require('../controllers/chatController');

//? Prefix: /characters
router.get('/', getAllChats);
router.get('/:campaign', getChats);
router.post('/:campaign', addChat);
router.delete('/', removeChat);
router.delete('/clearHistory/:campaign', clearChatHistory);

module.exports = router;
