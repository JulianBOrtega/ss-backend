const express = require('express');
const router = express.Router();
const { getAllItems, getItemById, addItem } = require('../controllers/itemsController');

router.get('/items', getAllItems);
router.get('/item/:id', getItemById);
router.post('/item', addItem);

module.exports = router;
