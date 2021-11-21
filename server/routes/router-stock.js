const express = require('express');

const router = express.Router();
const {
  getStockQuote,
  getStockChart,
} = require('../controllers/controller-stock');

router.route('/quote/:symbol').get(getStockQuote);
router.route('/chart/:symbol').get(getStockChart);

module.exports = router;
