require('dotenv').config();

const { DB_HOST, PORT, SECRET_KEY } = process.env;

module.exports = {
  port: PORT,
  db_host: DB_HOST,
  secret_key: SECRET_KEY,
};
