const Web3 = require('web3')

const ContractOwnerDAO = require('../../daos/contractOwnerDao')
const TransactionsDAO = require('../../daos/transactionsDao')

const web3 = new Web3(new Web3.providers.WebsocketProvider(process.env.WEB3_PROVIDER))

function returnInternalServerError() {
    console.log(`[ERROR] latestBlockTransfersService: ${err}`)
    res.status(500).json({
        message: 'Internal server error.'
    })
}

async function getLatestBlockTransfers(res, assetAdress, owner) {
    if (assetAdress == undefined || owner == undefined) {
        res.status(400).json({
            message: 'Asset adress or owner adress is not defined.'
        })
        return
    }

    let subscription = web3.eth.subscribe('logs', {
        address: assetAdress
    }, (err, result) => {
        if (err) {
            res.status(500).json({
                message: 'Internal server error.'
            })
        }
    })
    .on("connected", (subscriptionId) => {
        console.log(`Connected to ${subscriptionId}`);
        res.status(200).json({
            message: 'Started syncing transactions.',
            subscriptionsId: subscriptionId
        })
    })
    .on("data", (log) => {
        web3.eth.getTransaction(log.transactionHash)
            .then((transaction) => {
                 if (transaction.from == owner) {
                    ContractOwnerDAO.findByContractAndAdress({
                        contract: assetAdress,
                        owner: owner
                     }).then((contractOwner) => {
                      if (contractOwner != null) {
                         TransactionsDAO.createNewTransaction({
                             info: JSON.stringify(transaction),
                             contractOwnerId: contractOwner._id
                         })
                      } else {
                          ContractOwnerDAO.createNewContractOwner({
                             contract: assetAdress,
                             owner, owner
                        }).then((contractOwner) => {
                          TransactionsDAO.createNewTransaction({
                              info: JSON.stringify(transaction),
                              contractOwnerId: contractOwner._id
                            })
                        }).catch(err => {
                            returnInternalServerError()
                        })
                     }
                     }).catch(err => {
                            returnInternalServerError()
                     })
                 }
            }).catch(err => {
                returnInternalServerError()
            })
    })
}

module.exports = {
    getLatestBlockTransfers
}
