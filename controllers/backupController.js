const Character = require('../database/models/character');
const Backup = require('../database/models/backup');

//* Get backup info for characters
const getCharacterBackup = async (req, res) => {
    const campaignId = req.params.campaign;
    if (!campaignId) {
        res.status(400).json({
            error: 'Introduce a campaign ID to extract the backupId from'
        });

        return;
    }

    const filter = { campaignId: campaignId, backupType: 'characters' };
    const search = await Backup.find(filter).exec();

    if(search) {
        res.status(200).send(search);
    } else {
        res.status(500).json({
            error: 'DB ERROR - At fetching character backup data'
        });
    };
}

//* Set backup info for characters
const setCharacterBackup = async (req, res) => {
    const campaignId = req.params.campaign;
    const newItem = req.body;

    if (!campaignId || !newItem) {
        res.status(400).json({
            error: 'Introduce a campaign ID and the backup data to set'
        });

        return;
    } else if (!newItem.id) {
        res.status(400).json({
            error: "Backup data doesn't contains an ID"
        });

        return;
    }

    const filter = { campaignId: campaignId, backupType: 'characters' };
    const search = await Backup.findOne(filter).exec();

    if(search) {
        Object.assign(search, newItem);
        const result = await search.save();
        res.status(200).send(result);
    } else {
        const newBackup = new Backup({
            ...newItem,
            backupType: 'characters',
            campaignId: campaignId
        });
        const result = await newBackup.save();

        if(result) {
            res.status(200).send(result);
        } else {
            res.status(500).json({
                error: 'DB ERROR - At creating backup info for '
            })
        }
    }
}

//* Restore character data for characters (receives backup data - no backup info)
const restoreCharacters = async (req, res) => {
    const campaignId = req.params.campaign;
    let newCollection = req.body;

    if (!campaignId || !newCollection) {
        res.status(400).json({
            error: 'Introduce a campaign ID and the backup data to restore'
        });

        return;
    }

    //? Avoiding random characters from other campaigns
    newCollection = newCollection.filter(c => c.campaignId == campaignId);

    const filter = { campaignId: campaignId };
    const removal = await Character.deleteMany(filter);
    const addition = await Character.insertMany(newCollection);

    if(!removal || !addition) {
        res.status(500).json({
            error: 'DB ERROR - Something went wrong in an attempt to restore backup data'
        });
        
        return;
    }
    
    const removalAmount = removal?.deletedCount;
    const additionAmount = addition?.length;

    res.status(200).send(
        `${removalAmount} characters were deleted, and ${additionAmount} were added.`
    );
}

module.exports = { 
    getCharacterBackup,
    setCharacterBackup,
    restoreCharacters
};
