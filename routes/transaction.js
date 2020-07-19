let express = require('express');
let router = express.Router();
let transactionsController = require('../controllers/transactionsController')

router.post('/:asset_adress', transactionsController.latestBlockTransfers)

router.get('/:asset_adress', transactionsController.listTransfers)

module.exports = router;
