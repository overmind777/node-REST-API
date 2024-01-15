const express = require('express');

const contactsController = require('../../controllers/contactsController');

const validate = require('../../middlewares/validate');
const { schemas } = require('../../models/index');
const { isValidId } = require('../../middlewares');

const contactsRouter = express.Router();

contactsRouter.get('/', contactsController.listContacts);

contactsRouter.get('/:contactId', isValidId, contactsController.getContactById);

contactsRouter.post(
  '/',
  validate(schemas.validateContacts),
  contactsController.addNewContact
);

contactsRouter.delete(
  '/:contactId',
  isValidId,
  contactsController.deleteContactById
);

contactsRouter.put(
  '/:contactId',
  isValidId,
  validate(schemas.validateContacts),
  contactsController.updateContact
);

contactsRouter.patch(
  '/:contactId/favorite',
  isValidId,
  validate(schemas.validateFavorite),
  contactsController.updateFavoritesStatus
);

module.exports = contactsRouter;
