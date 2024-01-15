const contactsRouter = require("./contacts");
const authRouter = require('./auth');

module.exports = {
  authRouter: authRouter,
  contactsRouter: contactsRouter,
};