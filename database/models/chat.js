const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    id:             { type: String, required: true },
    userId:         { type: String, required: true },
    campaignId:     { type: String, required: true },
    characterId:    { type: String, required: true },
    msg:            { type: String, required: true },
    rollResult:     { type: String, required: false },
    successLevel:   { type: String, required: false },
    isWhisper:      { type: Boolean, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Chat', chatSchema);