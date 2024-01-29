require('dotenv').config();

const { DB_HOST, PORT, SECRET_KEY, EMAIL, EMAIL_PASS } = process.env;

module.exports = {
  port: PORT,
  db_host: DB_HOST,
  secret_key: SECRET_KEY,
  email: EMAIL,
  emailPass: EMAIL_PASS,
};
