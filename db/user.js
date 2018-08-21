const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const nanoid = require('nanoid');
const config = require('../config');

const pool = new Pool({
  connectionString: config.dbConnectionString
});

const createTable = async () => {
  await pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL NOT NULL UNIQUE,
    username VARCHAR(21) NOT NULL UNIQUE,
    email VARCHAR(250) NOT NULL UNIQUE,
    password VARCHAR(250) NOT NULL,
    fullname VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY(id, username)
  )
`);
};

const insert = async user => {
  user.username = nanoid();
  user.password = await bcrypt.hash(user.password, 10);
  await pool.query({
    text: `INSERT INTO users(username, email, password, fullname)
           VALUES($1, $2, $3, $4)`,
    values: [user.username, user.email, user.password, user.fullname]
  });
  return user.username;
};

const update = async user => {
  return pool.query({
    text: 'UPDATE users SET fullname=$1 WHERE username=$2',
    values: [user.fullname, user.username]
  });
};

const get = async user => {
  const details = await pool.query({
    text: 'SELECT username, password FROM users WHERE email=$1',
    values: [user.email]
  });
  return details.rowCount === 1 ? details.rows[0] : null;
};

const connect = () => {
  return pool.query('SELECT NOW()');
};

module.exports = {
  createTable,
  insert,
  update,
  get,
  connect
};
