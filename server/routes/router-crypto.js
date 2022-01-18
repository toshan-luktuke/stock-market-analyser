const express = require('express');
const router = express.Router();

const {
  getCryptoLength,
  getCryptoChart,
} = require('../controllers/controller-crypto');

router.route('/length').get(getCryptoLength);
router.route('/chart/:id').get(getCryptoChart);
// bitcoin - BTC
// ethereum - ETH
// dogecoin - DOGE

module.exports = router;
