const express = require('express');

const router = express.Router();
const {
  getStockQuote,
  getStockChart,
  getStockLength,
} = require('../controllers/controller-stock');

router.route('/quote/:symbol').get(getStockQuote);
router.route('/chart/:symbol').get(getStockChart);
router.route('/length').get(getStockLength);

module.exports = router;
