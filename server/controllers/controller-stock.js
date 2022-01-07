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

module.exports.getStockDetails = async (req, res, next) => {
  try {
    const { symbol } = req.params;
    const symbolize = symbol.toUpperCase();
    const { data } = await axios.get(
      `https://financialmodelingprep.com/api/v3/profile/${symbolize}?apikey=${process.env.API_KEY_FMP}`,
    );
    const stonkData = data[0];
    res.status(200).json({ success: true, data: stonkData });
  } catch (error) {
    next(error);
  }
};

module.exports.getSocialSentiments = async (req, res, next) => {
  try {
    const { symbol } = req.params;
    const symbolize = symbol.toUpperCase();
    const { data } = await axios.get(
      `https://financialmodelingprep.com/api/v4/historical/social-sentiment?symbol=${symbolize}&apikey=${process.env.API_KEY_FMP}`,
    );
    const sentiments = data[0];
    res.status(200).json({ success: true, data: sentiments });
  } catch (error) {
    next(error);
  }
};

module.exports.getRating = async (req, res, next) => {
  try {
    const { symbol } = req.params;
    const symbolize = symbol.toUpperCase();
    const { data } = await axios.get(
      `https://financialmodelingprep.com/api/v3/rating/${symbolize}?apikey=${process.env.API_KEY_FMP}`,
    );
    const rating = data[0];
    res.status(200).json({ success: true, data: rating });
  } catch (error) {
    next(error);
  }
};

module.exports.getIndexQuote = async (req, res, next) => {
  try {
    const { symbol } = req.params;
    // BNSX - SENSEX
    // BSEN - NIFTY 50
    const symbolize = symbol.toUpperCase();
    const {
      data: { data },
    } = await axios.get(
      `https://priceapi.moneycontrol.com/pricefeed/notapplicable/inidicesindia/in%3${symbolize}`,
    );
    // pricecurrent attribute is the live price of the index
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports.getIndexChart = async (req, res, next) => {
  try {
    const { symbol, start, end } = req.params;
    // BNSX - SENSEX
    // BSEN - NIFTY 50
    const symbolize = symbol.toUpperCase();
    let ticker;
    if (symbolize === 'BNSX') {
      ticker = 4;
    } else {
      ticker = 9;
    }
    const {
      data: { c, t },
    } = await axios.get(
      `https://priceapi.moneycontrol.com/techCharts/history?symbol=${ticker}&resolution=1&from=${start}&to=${end}`,
    );
    const toSend = { c, t };
    res.status(200).json(toSend);
  } catch (error) {
    next(error);
  }
};
