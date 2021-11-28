const express = require('express');
const router = express.Router();

const { getCryptoLength } = require('../controllers/controller-crypto');

router.route('/length').get(getCryptoLength);

module.exports = router;
