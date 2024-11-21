const express = require('express');
const { 
    getCharacterBackup, setCharacterBackup, 
    restoreCharacters 
} = require('../controllers/backupController');
const router = express.Router();

//? Prefix: /backup
router.get('/characters/:campaign', getCharacterBackup);
router.post('/characters/:campaign', setCharacterBackup);
router.post('/characters/:campaign/restore', restoreCharacters);

module.exports = router;
