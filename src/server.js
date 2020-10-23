const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const middlewares = require('./middlewares');
const logs = require('./api/logs');

const app = express();

app.enable('trust proxy');

mongoose.connect('mongodb://localhost:27017/dbname', { useNewUrlParser: true, useUnifiedTopology: true, family: 4 });

app.use(morgan('common'));
app.use(helmet());

const port = 3000;

app.use(cors({
  origin: `Http://localhost:${port}`,
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'hello world',
  });
});

app.use('/api/logs', logs);

app.use(middlewares.notFound);

app.use(middlewares.errorHandler);

app.listen(port, () => {
  console.log(`listening at Http://localhost:${port}`);
});
