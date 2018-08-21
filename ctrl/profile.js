const jwt = require('jwt-then');
const { validationResult } = require('express-validator/check');

const Config = require('../config');
const User = require('../db/user');

const profile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    const user = await jwt.verify(req.body.token, Config.secret);
    await User.update({ username: user.username, fullname: req.body.fullname });
    res.status(200).end();
  } catch (error) {
    console.log(error);
    res.status(401).end();
  }
};

module.exports = {
  profile
};
