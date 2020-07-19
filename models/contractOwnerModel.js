"use strict"

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContractOwnerSchema = new Schema({
    contract: { type: String },
    owner: { type: String }
},{
    versionKey: false,
    collection: 'ContractOwnersCollection'
});

module.exports = mongoose.model('ContractOwnerModel', ContractOwnerSchema)
