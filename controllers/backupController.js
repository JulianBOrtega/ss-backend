const { readFileSync, writeFileSync } = require('../utility/fileManagement');

const getCharacterBackup = async (req, res) => {
    const campaignId = req.params.campaign;
    if (!campaignId) {
        res.status(400).json({
            error: 'Introduce a campaign ID to extract the backupId from'
        });

        return;
    }

    const characters = await readFileSync('characters.json');
    const campaign = characters.find(list => list.campaignId == campaignId);

    if(!campaign) {
        res.status(404).json({
            error: 'Campaign not found'
        })
    } else {
        res.json(campaign.backup);
    }
}


const setCharacterBackup = async (req, res) => {
    const campaignId = req.params.campaign;
    const newItem = req.body;

    if (!campaignId || !newItem) {
        res.status(400).json({
            error: 'Introduce a campaign ID and the backup data to set'
        });

        return;
    }

    const characters = await readFileSync('characters.json');
    const campaignIndex = characters.findIndex(list => list.campaignId == campaignId);

    if(campaignIndex == -1) {
        res.status(404).json({
            error: 'Campaign not found'
        })
    } else {
        characters[campaignIndex].backup = newItem;
        await writeFileSync('characters.json', characters);
        res.status(201).json(newItem);
    }
}

const restoreCharacters = async (req, res) => {
    const campaignId = req.params.campaign;
    const newItem = req.body;

    if (!campaignId || !newItem) {
        res.status(400).json({
            error: 'Introduce a campaign ID and the backup data to restore'
        });

        return;
    }

    const characters = await readFileSync('characters.json');
    const campaignIndex = characters.findIndex(list => list.campaignId == campaignId);

    if(campaignIndex == -1) {
        res.status(404).json({
            error: 'Campaign not found'
        })
    } else {
        characters[campaignIndex].characters = newItem;
        await writeFileSync('characters.json', characters);
        res.status(201).json(newItem);
    }
}

module.exports = { 
    getCharacterBackup,
    setCharacterBackup,
    restoreCharacters
};
