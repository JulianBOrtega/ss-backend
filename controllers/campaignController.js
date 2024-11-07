const { readFileSync, writeFileSync } = require('../utility/fileManagement');

//? Gets all campaigns
const getAllCampaigns = async (req, res) => {
    const items = await readFileSync('campaigns.json');
    res.json(items);
};

//? Gets a single campaign
const getCampaign = async (req, res) => {
    const campaignId = req.params.campaign;
    
    if (!campaignId && campaignId != 0) {
        res.status(400).json({ 
            error: "Introduce the ID of the campaign to get."
        });

        return;
    } 
    
    const campaigns = await readFileSync('campaigns.json');
    const item = campaigns.find(c => c.id == campaignId);

    if (!item) {
        res.status(404).json({ error: 'Campaign not found' });
    } else {
        res.json(item);
    }
};

//? Adds or updates a single campaign and returns it with an ID
const addCampaign = async (req, res) => {
    const newItem = req.body;
    
    if (!newItem) {
        res.status(400).json({
            error: 'Introduce the campaing to send.'
        });

        return;
    }
    
    const campaigns = await readFileSync('campaigns.json');
    
    let copyIndex = -1;
    if(newItem.id || newItem.id == 0) {
        copyIndex = campaigns.findIndex(c => c.id == newItem.id);
    } else {
        newItem.id = campaigns.length;
    };
    
    if (copyIndex != -1) {
        campaigns[copyIndex] = newItem;
    } else {
        campaigns.push(newItem);
    }

    await writeFileSync('campaigns.json', campaigns);
    res.status(201).json(newItem);
};

//? Removes all campaigns with a given id
const removeCampaign = async (req, res) => {
    const { campaignId } = req.query;

    if (!campaignId && campaignId != 0) {
        res.status(400).json({
            error: 'Introduce a campaign ID'
        });

        return;
    }

    let campaigns = await readFileSync('campaigns.json');
    campaigns = campaigns.filter(c => c.id != campaignId);

    await writeFileSync('campaigns.json', campaigns);
    res.status(200).json({msg: 'Success'});
}

module.exports = { 
    getAllCampaigns, 
    getCampaign, 
    addCampaign,  
    removeCampaign 
};
