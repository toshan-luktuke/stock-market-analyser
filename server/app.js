require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(
  cors({
    origin: '*',
  }),
);
app.use(express.json());

const port = process.env.PORT;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log('Server is listening at ');
  /* eslint-enable no-console */
});
