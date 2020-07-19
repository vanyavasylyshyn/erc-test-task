"use strict"

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionsSchema = new Schema({
    info: { type: String },
    contractOwnerId: { type: Schema.Types.ObjectId, ref: 'ContractOwnersCollection' },
    createdAt: { type: Date, default: Date.now }
},{
    versionKey: false,
    collection: 'TransactionsCollection'
});

module.exports = mongoose.model('TransactionModel', TransactionsSchema)
