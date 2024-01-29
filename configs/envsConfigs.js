require('dotenv').config();

const { DB_HOST, PORT, SECRET_KEY, BASE_URL, EMAIL, EMAIL_PASS } = process.env;

module.exports = {
  port: PORT,
  db_host: DB_HOST,
  secret_key: SECRET_KEY,
  baseURL: BASE_URL,
  email: EMAIL,
  emailPass: EMAIL_PASS,
};
