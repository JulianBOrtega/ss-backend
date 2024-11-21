const { readFileSync, writeFileSync, generateID } = require('../utility/fileManagement');

//? Gets all characters
const getAllCharacters = async (req, res) => {
    const items = await readFileSync('characters.json');
    res.json(items);
};

//? Gets all characters from a given campaign
const getCharacters = async (req, res) => {
    const campaignId = req.params.campaign;
    
    if (!campaignId && campaignId != 0) {
        res.status(400).json({ 
            error: 'Introduce a campaign id to extract the characters from' 
        });
        return;
    }
    
    const characters = await readFileSync('characters.json');
    const campaign = characters.find(list => list.campaignId == campaignId);

    if (!campaign) {
        res.json([]);
    } else {
        res.json(campaign.characters);
    }
};

//? Gets a single character from a given campaign
const getCharacter = async (req, res) => {
    const campaignId = req.params.campaign;
    const characterId = req.params.character;

    if ((!campaignId && campaignId != 0) || (!characterId && characterIdId != 0)) {
        res.status(400).json({
            error: 'Introduce a campaign and character ID'
        });

        return;
    }
    
    const characters = await readFileSync('characters.json');
    const campaign = characters.find(list => list.campaignId == campaignId);
    if(!campaign) {
        res.status(404).json({ error: 'Campaign not found'});
        return;
    }

    const item = campaign.characters.find(camp => camp.id == characterId);

    if (!item) {
        res.status(404).json({ error: 'Characters not found in campaign' });
    } else {
        res.json(item);
    }
}

//? Adds or updates a single character to a given campaign 
//? and returns it with an ID.
//? If campaign doesn't exists, it creates it
const addCharacter = async (req, res) => {
    const campaignId = req.params.campaign;
    const newItem = req.body;
    
    if ((!campaignId && campaignId != 0) || !newItem) {
        res.status(400).json({
            error: 'Introduce campaign ID and a new character'
        });

        return;
    }
    
    const characters = await readFileSync('characters.json');
    let campaign = characters.find(list => list.campaignId == campaignId);
    if(!campaign) {
        characters.push({
         campaignId: campaignId,
         characters: [],
         backup: null
        });
 
        campaign = characters[characters.length - 1];
     };
    
    let copyIndex = -1;
    if(newItem.id || newItem.id == 0) {
        copyIndex = campaign.characters.findIndex(
            chara => chara.id == newItem.id
        );
    } else {
        newItem.id = generateID();
    };
    
    if (copyIndex != -1) {
        campaign.characters[copyIndex] = newItem;
    } else {
        campaign.characters.push(newItem);
    }

    await writeFileSync('characters.json', characters);
    res.status(201).json(newItem);
};

//? Removes all characters with a given id from all lists
//? or a given campaign
const removeCharacter = async (req, res) => {
    const { campaignId, characterId } = req.query;

    if (!characterId && characterId != 0) {
        res.status(400).json({
            error: 'Introduce a character ID'
        });
        
        return;
    }

    let characters = await readFileSync('characters.json');
    const campaign = characters.find(list => list.campaignId == campaignId);

    if(!campaignId && campaignId != 0) {
        characters = characters.map(camp => {
            return {
                ...camp,
                characters: camp.characters.filter(c => c.id != characterId)
            };
        });
    } else {
        if(!campaign) {
            res.status(404).json({
                error: 'Cannot find campaign with the introduced ID'
            });
            
            return;
        }

        campaign.characters = campaign.characters.filter(
            c => c.id != characterId
        );
    }

    await writeFileSync('characters.json', characters);
    res.status(200).json({msg: 'Success'});
}

module.exports = { 
    getAllCharacters, 
    getCharacters, 
    getCharacter, 
    addCharacter, 
    removeCharacter
};
