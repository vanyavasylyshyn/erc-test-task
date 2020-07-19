"use strict"

const Transactions = require('../models/transactionsModel');

let createNewTransaction = async (data = {}) => {
    return await Transactions.create({
        info: data.info,
        contractOwnerId: data.contractOwnerId
    })
}

let getTransactions = async (contractOwnerID, limit, skip) => {
    return await Transactions
        .find({
            contractOwnerId: contractOwnerID
        })
        .sort('-createdAt')
        .skip(skip)
        .limit(limit)
}

module.exports = {
    createNewTransaction,
    getTransactions
}
