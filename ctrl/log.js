const jwt = require('jwt-then');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator/check');

const Config = require('../config');
const User = require('../db/user');

const log = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const details = await User.get({
      email: req.body.email,
      password: req.body.password
    });
    if (details === null) {
      return res.status(400).end();
    }
    const { username, password } = details;
    const match = await bcrypt.compare(req.body.password, password);
    if (!match) {
      return res.status(400).end();
    }
    const token = await jwt.sign({ username }, Config.secret);
    res.json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
};

module.exports = {
  log
};
