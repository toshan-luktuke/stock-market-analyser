const express = require('express');

const router = express.Router();
const {
  getStockQuote,
  getStockChart,
  getStockLength,
  getWSB,
  getAutosuggestions,
  getStockDetails,
  getSocialSentiments,
  getRating,
} = require('../controllers/controller-stock');

router.route('/quote/:symbol').get(getStockQuote);
router.route('/chart/:symbol').get(getStockChart);
router.route('/autosuggest/:name').get(getAutosuggestions);
router.route('/length').get(getStockLength);
router.route('/wsb').get(getWSB);
router.route('/details/:symbol').get(getStockDetails);
router.route('/social/:symbol').get(getSocialSentiments);
router.route('/rating/:symbol').get(getRating);

module.exports = router;
