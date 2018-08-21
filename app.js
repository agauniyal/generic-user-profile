const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const Config = require('./config');
const check = require('./ctrl/validation');
const User = require('./db/user');
const { register } = require('./ctrl/register');
const { log } = require('./ctrl/log');
const { profile } = require('./ctrl/profile');

const app = express();
app.use(morgan('dev'));
app.use(helmet());
app.use(bodyParser.json());

app.post('/user/register', check.register, register);
app.post('/user/log', check.log, log);
app.put('/user/profile', check.profile, profile);

app.listen(Config.port, async () => {
  try {
    const result = await User.connect();
    await User.createTable();
    console.log(`Connected to DB at: ${result.rows[0].now}`);
    console.log(`Server listening on: ${Config.port}!`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
});
