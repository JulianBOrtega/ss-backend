const express = require('express');
const router = express.Router();
const { 
    getAllCharacters, getCharacters, getCharacter, 
    addCharacter, removeCharacter,  
} = require('../controllers/characterController');

//? Prefix: /characters
router.get('/', getAllCharacters);
router.get('/:campaign', getCharacters);
router.get('/:campaign/:character', getCharacter);
router.post('/:campaign', addCharacter);
router.delete('/', removeCharacter);

module.exports = router;
