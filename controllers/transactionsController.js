const transactionService = require('../services/transactionService')

latestBlockTransfers = (req, res, next) => {
    let assetAdress = req.params.asset_adress;
    let owner = req.query.owner;

    transactionService.latestBlockTransfersService.getLatestBlockTransfers(res, assetAdress, owner)
}

listTransfers = (req, res, next) => {
   let assetAdress = req.params.asset_adress;
    let owner = req.query.owner;
    let limit = parseInt(req.query.limit) || process.env.DEFAULT_LIMIT;
    let skip = parseInt(req.query.skip) || process.env.DEFAULT_SKIP;

    transactionService.listTransfersService.getListTransfersByContractAndUser(res, assetAdress, owner, limit, skip)
}

module.exports = {
    latestBlockTransfers,
    listTransfers
}
