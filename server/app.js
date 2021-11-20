require('dotenv').config();

const express = require('express');
const app = express();

const cors = require('cors');

const axios = require('axios');

const morgan = require('morgan');

app.use(morgan('dev'));
