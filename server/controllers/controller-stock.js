const axios = require('axios');

module.exports.getStockQuote = async (req, res, next) => {
  try {
    const { symbol } = req.params;
    const symbolize = symbol.toUpperCase();
    const { data } = await axios.get(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbolize}`,
    );
    const {
      chart: { result },
    } = data;
    const {
      meta: { regularMarketPrice },
    } = result[0];
    res.status(200).json({ success: true, data: regularMarketPrice });
  } catch (error) {
    next(error);
  }
};

module.exports.getStockChart = async (req, res, next) => {
  try {
    const { symbol } = req.params;
    const symbolize = symbol.toUpperCase();
    const { data } = await axios.get(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbolize}`,
    );
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

module.exports.getStockLength = async (req, res, next) => {
  try {
    const { data } = await axios.get(
      `https://financialmodelingprep.com/api/v3/financial-statement-symbol-lists?apikey=${process.env.API_KEY_FMP}`,
    );
    const length = data.length;
    res.status(200).json({ success: true, data: length });
  } catch (error) {
    next(error);
  }
};

module.exports.getWSB = async (req, res, next) => {
  try {
    const { data } = await axios.get(
      `https://tradestie.com/api/v1/apps/reddit`,
    );
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

module.exports.getAutosuggestions = async (req, res, next) => {
  try {
    const { name } = req.params;
    const { data } = await axios.get(
      `https://financialmodelingprep.com/api/v3/search-name?query=${name}&limit=10&exchange=NASDAQ&apikey=${process.env.API_KEY_FMP}`,
    );
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
