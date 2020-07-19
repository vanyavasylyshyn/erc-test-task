"use strict"

const ContractOwner = require('../models/contractOwnerModel.js');

let createNewContractOwner = async (data = {}) => {
   return await ContractOwner.create({
        contract: data.contract,
        owner: data.owner
   })
}

let findByContractAndAdress = async (data = {}) => {
    return await ContractOwner.findOne({
        contract: data.contract,
        owner: data.owner
    })
}

module.exports = {
    createNewContractOwner,
    findByContractAndAdress
}
