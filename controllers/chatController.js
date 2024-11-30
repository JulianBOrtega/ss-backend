const { generateID } = require('../utility/misc');
const Chat = require('../database/models/chat');

//* Gets all chats
const getAllChats = async (req, res) => {
    const chats = await Chat.find();

    if(chats) {
        res.status(200).send(chats);
    } else {
        res.status(500).send('DB ERROR - At fetchin all chats');
    }
};

//* Gets chats from a given campaign
const getChats = async (req, res) => {
    const campaignId = req.params.campaign;
    
    if (!campaignId && campaignId != 0) {
        res.status(400).json({ 
        error: 'Introduce a campaign id to extract the chats from' 
        });

        return;
    }
    
    const filter = { campaignId: campaignId };
    const search = await Chat.find(filter).exec();

    if(search) {
        res.status(200).send(search);
    } else {
        res.status(500).json({
            error: 'DB ERROR - At fetching chats from campaign'
        });
    }
};

//* Adds or updates a single chat to a given campaign 
//* and returns it with an ID
const addChat = async (req, res) => {
    const campaignId = req.params.campaign;
    const newItem = req.body;
    
    if ((!campaignId && campaignId != 0) || !newItem) {
        res.status(400).json({
            error: 'Introduce campaign ID and a new chat'
        });

        return;
    }
    
    if(newItem.id) {
        const filter = { id: newItem.id, campaignId: campaignId };
        const search = await Chat.findOne(filter).exec();

        if(search) {
            Object.assign(search, newItem);
            const result = await search.save();
            res.status(200).send(result);
        } else {
            res.status(500).json({
                error: 'DB ERROR - At updating chat'
            })
        }
    } else {
        newItem.id = generateID();
        newItem.campaignId = campaignId;
        const newChat = new Chat(newItem);
        const result = await newChat.save();

        if(result) {
            res.status(200).send(result);
        } else {
            res.status(500).json({
                error: 'DB ERROR - At creating new character and adding it to DB'
            });
        }
    }
};

//* Removes all chats with a given id from all lists
//* or a given campaign
const removeChat = async (req, res) => {
    const { campaignId, chatId } = req.query;

    if ((!chatId && chatId != 0) || (!campaignId && campaignId != 0)) {
        res.status(400).json({
            error: 'Introduce a campaign and chat ID'
        });

        return;
    }

    const filter = { id: chatId, campaignId: campaignId };
    const removal = await Chat.deleteOne(filter).exec();

    if(removal) {
        res.status(200).send('Chat removed');
    } else {
        res.status(500).json({
            error: 'DB Error - At removing chat'
        })
    }
}

//* Deletes all chat messages of a campaign
const clearChatHistory = async (req, res) => {
    const campaignId = req.params.campaign;

    if (!campaignId && campaignId != 0) {
        res.status(400).json({ 
        error: 'Introduce a campaign id to clear the chat from' 
        });

        return;
    }

   const filter = { campaignId: campaignId };
   const removal = await Chat.deleteMany(filter);
   
   if(removal) {
        res.status(200).send(`${removal?.deletedCount || 0} chat messages were deleted.`)
   } else {
        res.status(500).json({
            error: 'DB ERROR - At clearing chat history'
        })
   }
}

module.exports = { 
    getAllChats, 
    getChats, 
    addChat, 
    removeChat,
    clearChatHistory
};
