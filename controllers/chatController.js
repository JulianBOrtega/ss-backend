const { readFileSync, writeFileSync, generateID } = require('../utility/fileManagement');

//? Gets all chats
const getAllChats = async (req, res) => {
    const items = await readFileSync('chats.json');
    res.json(items);
};

//? Gets chats from a given campaign
const getChats = async (req, res) => {
    const campaignId = req.params.campaign;
    
    if (!campaignId && campaignId != 0) {
        res.status(400).json({ 
        error: 'Introduce a campaign id to extract the chats from' 
        });

        return;
    }
    
    const chats = await readFileSync('chats.json');
    const campaign = chats.find(list => list.campaignId == campaignId);

    if (!campaign) {
        res.json([]);
    } else {
        res.json(campaign.chats);
    }
};

//? Adds or updates a single chat to a given campaign 
//? and returns it with an ID
const addChat = async (req, res) => {
    const campaignId = req.params.campaign;
    const newItem = req.body;
    
    if ((!campaignId && campaignId != 0) || !newItem) {
        res.status(400).json({
            error: 'Introduce campaign ID and a new chat'
        });

        return;
    }
    
    const chats = await readFileSync('chats.json');
    let campaign = chats.find(list => list.campaignId == campaignId);
    
    if(!campaign) {
       chats.push({
        campaignId: campaignId,
        chats: []
       });

       campaign = chats[chats.length - 1];
    };
    
    let copyIndex = -1;
    if(newItem.id || newItem.id == 0) {
        copyIndex = campaign.chats.findIndex(
            chat => chat.id == newItem.id
        );
    } else {
        newItem.id = generateID();
    };
    
    if (copyIndex != -1) {
        campaign.chats[copyIndex] = newItem;
    } else {
        campaign.chats.push(newItem);
    }

    await writeFileSync('chats.json', chats);
    res.status(201).json(newItem);
};

//? Removes all chats with a given id from all lists
//? or a given campaign
const removeChat = async (req, res) => {
    const { campaignId, chatId } = req.query;

    if (!chatId && chatId != 0) {
        res.status(400).json({
            error: 'Introduce a chat ID'
        });

        return;
    }

    let chats = await readFileSync('chats.json');
    const campaign = chats.find(list => list.campaignId == campaignId);
    
    if(!campaign) {
        chats = chats.map(camp => {
            return {
                ...camp,
                chats: camp.chats.filter(c => c.id != chatId)
            };
        });
    } else {
        campaign.chats = campaign.chats.filter(
            c => c.id != chatId
        );
    }

    await writeFileSync('chats.json', chats);
    res.status(200).json({msg: 'Success'});
}

const clearChatHistory = async (req, res) => {
    const campaignId = req.params.campaign;

    if (!campaignId && campaignId != 0) {
        res.status(400).json({ 
        error: 'Introduce a campaign id to clear the chat from' 
        });

        return;
    }

    const chats = await readFileSync('chats.json');
    let campaignIndex = chats.findIndex(list => list.campaignId == campaignId);

    if(campaignId !== -1) {
        chats[campaignIndex].chats = [];
        await writeFileSync('chats.json', chats);
    }

    res.status(201).json('success');
}

module.exports = { 
    getAllChats, 
    getChats, 
    addChat, 
    removeChat,
    clearChatHistory
};
