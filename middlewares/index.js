const validate = require('./validate');
const isValidId = require('./isValidId');
const authenticate = require('./authenticate');
const upload = require('./upload');

module.exports = {
  isValidId,
  validate,
  authenticate,
  upload,
};
