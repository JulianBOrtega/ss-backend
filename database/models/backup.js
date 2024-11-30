const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const backupSchema = new Schema({
    id:         { type: String, required: true },
    backupType: { type: String, required: true },
    campaignId: { type: String, required: true },
    timestamp:  { type: String, required: true },
}, { timestamps: true});

module.exports = mongoose.model('Backup', backupSchema);