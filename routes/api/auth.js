const express = require('express');
const authController = require('../../controllers/authController');
const validate = require('../../middlewares/validate');
const { schemas } = require('../../models');
const authenticate = require('../../middlewares/authenticate');
const upload = require('../../middlewares/upload');

const authRouter = express.Router();

authRouter.post(
  '/register',
  validate(schemas.validateUser),
  authController.register
);
authRouter.post('/login', validate(schemas.validateUser), authController.login);
authRouter.get('/current', authenticate, authController.getCurrent);
authRouter.post('/logout', authenticate, authController.logout);
authRouter.patch(
  '/avatar',
  authenticate,
  upload.single('avatar'),
  authController.updateAvatar
);
authRouter.get('/verify/:verificationToken', authController.resend);
authRouter.post(
  '/verify/',
  validate(schemas.emailSchema),
  authController.verify
);

module.exports = authRouter;
