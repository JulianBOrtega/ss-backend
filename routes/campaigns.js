const express = require('express');
const router = express.Router();
const { 
    getAllCampaigns, getCampaign,
    addCampaign, removeCampaign
} = require('../controllers/campaignController');

//? Prefix: /characters
router.get('/', getAllCampaigns);
router.get('/:campaign', getCampaign);
router.post('/', addCampaign);
router.delete('/', removeCampaign);

module.exports = router;
