"use strict"

const TransactionsDAO = require('../../daos/transactionsDao')
const ContractOwnerDAO = require('../../daos/contractOwnerDao')

async function getListTransfersByContractAndUser (res, assetAdress, owner, limit, skip) {
   console.log(assetAdress)
   console.log(owner)
   if (assetAdress == undefined || owner == undefined) {
      res.status(400).json({
         message: 'Asset adress or owner adress is not defined.'
      })
      return
   }

   try {
      let result = [];

      let contractOwner = await ContractOwnerDAO.findByContractAndAdress({
         contract: assetAdress,
         owner: owner
      })
      if (contractOwner == null) {
         res.status(200).json({
            message: 'No such owner in database.'
         })
      }
      let transactionsFromDB = await TransactionsDAO.getTransactions(contractOwner._id,
                                                               limit,
                                                               skip)
      transactionsFromDB.forEach( transaction => {
         result.push(JSON.parse(transaction.info))
      } )

      res.status(200).json({
         result: result,
         message: 'Success.'
      })
   } catch(err) {
      console.log(`[ERROR] getListTransfersByCotractAndUser: ${err}`)
      res.status(500).json({
         message: 'Internal server error.'
      })
   }
}

module.exports = {
   getListTransfersByContractAndUser
}
