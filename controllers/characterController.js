const { generateID } = require('../utility/misc');
const Character = require('../database/models/character');

//* Gets all characters
const getAllCharacters = async (req, res) => {
    const characters = await Character.find();
    
    if(characters) {
        res.status(200).send(characters);
    } else {
        res.status(500).send('DB ERROR - At fetching all characters');
    }
};

//* Gets all characters from a given campaign
const getCharacters = async (req, res) => {
    const campaignId = req.params.campaign;
    
    if (!campaignId && campaignId != 0) {
        res.status(400).json({ 
            error: 'Introduce a campaign id to extract the characters from' 
        });
        return;
    }
    
    const filter = { campaignId: campaignId };
    const search = await Character.find(filter).exec();

    if(search) {
        res.status(200).send(search);
    } else {
        res.status(500).json({
            error: 'DB ERROR - At fetching characters from campaign'
        });
    }
};

//* Gets a single character from a given campaign
const getCharacter = async (req, res) => {
    const campaignId = req.params.campaign;
    const characterId = req.params.character;

    if ((!campaignId && campaignId != 0) || (!characterId && characterIdId != 0)) {
        res.status(400).json({
            error: 'Introduce a campaign and character ID'
        });

        return;
    }

    const filter = { id: characterId, campaignId: campaignId };
    const search = await Character.findOne(filter).exec();

    if(search) {
        res.status(200).send(search);
    } else {
        res.status(500).json({
            error: 'DB ERROR - At fetching character with characterId/campaignId'
        })
    }
}

//* Adds or updates a single character to a given campaign 
//* and returns it with an ID.
const addCharacter = async (req, res) => {
    const campaignId = req.params.campaign;
    const newItem = req.body;
    
    if ((!campaignId && campaignId != 0) || !newItem) {
        res.status(400).json({
            error: 'Introduce campaign ID and a new character'
        });

        return;
    }
    
    if(newItem.id) {
        const filter = { id: newItem.id, campaignId: campaignId };
        const search = await Character.findOne(filter).exec();

        if(search) {
            Object.assign(search, newItem);
            const result = await search.save();
            res.status(200).send(result);
        } else {
            res.status(500).json({
                error: 'DB ERROR - At updating character'
            })
        }
    } else {
        newItem.id = generateID();
        newItem.campaignId = campaignId;
        const newChara = new Character(newItem);
        const result = await newChara.save();

        if(result) {
            res.status(200).send(result);
        } else {
            res.status(500).json({
                error: 'DB ERROR - At creating new character and adding it to DB'
            })
        }
    }
};

//* Removes all characters with a given id from a campaign
const removeCharacter = async (req, res) => {
    const { campaignId, characterId } = req.query;
    
    if ((!characterId && characterId != 0) || (!campaignId && campaignId != 0)) {
        res.status(400).json({
            error: 'Introduce a campaign and character ID'
        });
        
        return;
    }

    const filter = { id: characterId, campaignId: campaignId };
    const removal = await Character.deleteOne(filter).exec();

    if(removal) {
        res.status(200).send('Character removed');
    } else {
        res.status(500).json({
            error: 'DB Error - At removing character'
        });
    }
}

module.exports = { 
    getAllCharacters, 
    getCharacters, 
    getCharacter, 
    addCharacter, 
    removeCharacter
};
