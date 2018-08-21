const port = process.env.PORT || 8080;
const secret = process.env.SECRET || 'supersecretstring';
const dbConnectionString = process.env.DBSTRING;

module.exports = { port, secret, dbConnectionString };
