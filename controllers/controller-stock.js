const axios = require('axios');
const { tick } = require('./../tick');
const { list } = require('./../list');
const sector = require('./../daily/sector.json');
const gainers = require('./../daily/gainers.json');
const losers = require('./../daily/losers.json');
const actives = require('./../daily/actives.json');

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
    let success = false;
    if (rating) {
      success = true;
    }
    res.status(200).json({ success, data: rating });
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

module.exports.getPredSuggestion = async (req, res, next) => {
  try {
    const { name } = req.params;
    const nameToSearch = name.charAt(0).toUpperCase() + name.slice(1);
    const queryResults = tick.filter((stock) => {
      return stock.name.includes(nameToSearch);
    });
    res.status(200).json(queryResults);
  } catch (error) {
    next(error);
  }
};

module.exports.getNewAutoSuggestions = async (req, res, next) => {
  try {
    const { name } = req.params;
    const nameToSearch = name.charAt(0).toUpperCase() + name.slice(1);
    const queryResults = list.filter((stock) => {
      return stock.name.includes(nameToSearch);
    });
    res.status(200).json(queryResults);
  } catch (error) {
    next(error);
  }
};

module.exports.isOpen = async (req, res, next) => {
  try {
    const { data } = await axios.get(
      `https://financialmodelingprep.com/api/v3/is-the-market-open?apikey=${process.env.API_KEY_FMP}`,
    );
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports.indianAutoSuggest = async (req, res, next) => {
  try {
    const { name } = req.params;
    const { data } = await axios.get(
      `https://www.moneycontrol.com/mccode/common/autosuggestion_solr.php?classic=true&query=${name}&type=1&format=json&callback=suggest1`,
    );
    const toSend = JSON.parse(data.slice(9, -1));
    res.status(200).json(toSend);
  } catch (error) {
    next(error);
  }
};

module.exports.isIndianOpen = async (req, res, next) => {
  try {
    const {
      data: {
        data: { lastupd },
      },
    } = await axios.get(
      'https://priceapi.moneycontrol.com/pricefeed/notapplicable/inidicesindia/in%3BSEN',
    );
    const toSend = { time: lastupd };
    res.status(200).json(toSend);
  } catch (error) {
    next(error);
  }
};

module.exports.getChartIndia = async (req, res, next) => {
  try {
    const { symbol } = req.params;
    // BNSX - SENSEX
    // BSEN - NIFTY 50
    const symbolize = symbol.toUpperCase();
    let ticker;
    if (symbolize === 'BNSX') {
      ticker = 4;
    } else {
      ticker = 9;
    }
    const { data } = await axios.get(
      `https://appfeeds.moneycontrol.com/jsonapi/market/graph&format=json&ind_id=${ticker}&range=1d&type=area`,
    );
    res.status(200).json(data.graph);
  } catch (error) {
    next(error);
  }
};

module.exports.getIndianStockChart = async (req, res, next) => {
  try {
    const { symbol } = req.params;
    const symbolize = symbol.toUpperCase();
    const { data } = await axios.get(
      `https://www.moneycontrol.com/mc/widget/stockdetails/getChartInfo?classic=true&scId=${symbolize}&type=N`,
    );
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports.getSectorPerformance = async (req, res, next) => {
  try {
    res.status(200).json({ data: sector, success: true });
  } catch (error) {
    next(error);
  }
};

module.exports.getTickerData = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, data: actives });
  } catch (error) {
    next(error);
  }
};

module.exports.getGainers = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, data: gainers });
  } catch (error) {
    next(error);
  }
};

module.exports.getLosers = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, data: losers });
  } catch (error) {
    next(error);
  }
};
