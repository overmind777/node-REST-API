const express = require('express');
const avatarController = require('../../controllers/avatarController');

const avatarRouter = express.Router();

avatarRouter.get('/', avatarController.getAvatar);

module.exports = avatarRouter;
