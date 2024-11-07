const express = require('express');
const router = express.Router();
const { 
    getAllChats, getChats,
    addChat, removeChat
} = require('../controllers/chatController');

//? Prefix: /characters
router.get('/', getAllChats);
router.get('/:campaign', getChats);
router.post('/:campaign', addChat);
router.delete('/', removeChat);

module.exports = router;
