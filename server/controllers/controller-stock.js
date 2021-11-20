const { default: axios } = require('axios');

module.exports.getStockQuote = async (req, res, next) => {
  try {
    const { symbol } = req.params;
    const { result } = await axios.get(
      `https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=${symbol}`,
      {
        'X-API-KEY': process.env.API_KEY,
      },
    );
  } catch (error) {
    next(error);
  }
};
