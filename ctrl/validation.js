const { body } = require('express-validator/check');

const register = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Invalid Email'),
  body('password')
    .not()
    .isEmpty()
    .withMessage('Invalid Password'),
  body('fullname')
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage('Invalid Full Name')
];

const log = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Invalid Email'),
  body('password')
    .exists()
    .withMessage('Invalid Password')
];

const profile = [
  body('token')
    .exists()
    .withMessage('Invalid login token'),
  body('fullname')
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage('Invalid Full Name')
];

module.exports = {
  register,
  log,
  profile
};
