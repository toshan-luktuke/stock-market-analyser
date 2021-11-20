const express = require('express');

const router = express.Router();
const { getStockQuote } = require('../controllers/controller-stock');

router.route('/:symbol').get(getStockQuote);

module.exports = router;
