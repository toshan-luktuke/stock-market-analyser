require('dotenv').config();

const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const stock = require('./routes/router-stock');
const crypto = require('./routes/router-crypto');

const app = express();
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.txt'),
  {
    flags: 'a',
  },
);

app.use(morgan('combined', { stream: accessLogStream }));
app.use(cors());
app.use(express.urlencoded({ extended: false })); // for the searchbar
app.use(express.json()); // for the HTTP request
app.use('/stock', stock);
app.use('/crypto', crypto);

const port = process.env.PORT;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Server is listening at http://localhost:${port}`);
  /* eslint-enable no-console */
});
