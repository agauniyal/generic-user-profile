const { validationResult } = require('express-validator/check');

const User = require('../db/user');

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const newUser = {
    email: req.body.email,
    password: req.body.password,
    fullname: req.body.fullname
  };
  try {
    const username = await User.insert(newUser);
    return res.json({ username });
  } catch (error) {
    console.log(error);
    return error.code === '23505'
      ? res.status(400).json({ error: 'User already exists' })
      : res.status(500).end();
  }
};

module.exports = {
  register
};
