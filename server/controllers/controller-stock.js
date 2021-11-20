const axios = require('axios');

module.exports.getStockQuote = async (req, res, next) => {
  try {
    const { symbol } = req.params;
    const symbolize = symbol.toUpperCase();
    const { data } = await axios.get(
      `https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=${symbolize}`,
      {
        headers: {
          'X-API-KEY': process.env.API_KEY,
        },
      },
    );
    const { quoteResponse } = data;
    const { result } = quoteResponse;
    const { ask } = result[0];
    res.status(200).json({ success: true, data: ask });
  } catch (error) {
    next(error);
  }
};
