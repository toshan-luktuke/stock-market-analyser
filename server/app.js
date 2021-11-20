require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const stock = require('./routes/router-stock');

const app = express();

app.use(morgan('dev')); // purge in production
app.use(
  cors({
    origin: '*',
  }),
);
app.use(express.urlencoded({ extended: false })); // for the searchbar
app.use(express.json()); // for the HTTP request
app.use('/stock', stock);

const port = process.env.PORT;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Server is listening at http://localhost:${port}`);
  /* eslint-enable no-console */
});
