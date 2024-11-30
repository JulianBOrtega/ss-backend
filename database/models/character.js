const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statsSchema = new Schema({
    str: { type: Number, required: true },
    dex: { type: Number, required: true },
    con: { type: Number, required: true },
    int: { type: Number, required: true },
    wis: { type: Number, required: true },
    cha: { type: Number, required: true },
}, { _id: false }); //? Prevents adding an `_id` to the nested object

const characterItemSchema = new Schema({
    itemId:     { type: String, required: true },
    equipped:   { type: Boolean, required: true },
    amount:     { type: Number, required: true },
}, { _id: false });

const bondSchema = new Schema({
    id:             { type: String, required: true },
    characterId:    { type: String, required: true },
    bond:           { type: Number, required: true },
    notes:          { type: String, required: true },
}, { _id: false });

const characterSchema = new Schema({
    id:         { type: String, required: true },
    userId:     { type: String, required: true },
    campaignId: { type: String, required: true },
    name:       { type: String, required: true },
    damageDice: { type: String, required: true },
    alignment:  { type: String, required: true },
    classId:    { type: Number, required: true },
    level:      { type: Number, required: true },
    exp:        { type: Number, required: true },
    hp:         { type: Number, required: true },
    tempArmor:  { type: Number, required: true },
    stats:      { type: statsSchema, required: true },
    inventory:  { type: [characterItemSchema], required: true },
    bonds:      { type: [bondSchema], required: true },

    imgPath:    { type: String, required: false },
    race:       { type: String, required: false }
}, { timestamps: true });

module.exports = mongoose.model('Character', characterSchema);