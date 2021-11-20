const axios = require('axios');

module.exports.getStockQuote = async (req, res, next) => {
  try {
    /* eslint-disable no-console */
    const { symbol } = req.params;
    const symbolize = symbol.toUpperCase();
    console.log(symbolize);
    const { data } = await axios.get(
      `https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=${symbolize}`,
      {
        headers: {
          'X-API-KEY': process.env.API_KEY,
        },
      },
    );
    console.log(data);
    const { quoteResponse } = data;
    console.log(quoteResponse);
    const { result } = quoteResponse;
    console.log(result);
    const { ask } = result[0];
    res.status(200).json({ success: true, data: ask });
  } catch (error) {
    console.log('here');
    next(error);
    /* eslint-enable no-console */
  }
};
