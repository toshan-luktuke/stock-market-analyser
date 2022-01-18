const axios = require('axios');

module.exports.getCryptoLength = async (req, res, next) => {
  try {
    const {
      data: { data },
    } = await axios.get('https://api.coincap.io/v2/assets');
    const length = data.length;
    res.status(200).json({ success: true, data: length });
  } catch (error) {
    next(error);
  }
};

module.exports.getCryptoChart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const idize = id.toLowerCase();
    const {
      data: { data },
    } = await axios.get(
      `https://api.coincap.io/v2/assets/${idize}/history?interval=m1`,
    );
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
