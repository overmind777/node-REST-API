const envsConfigs = require('../configs/envsConfigs');
const { controllerWrapper, HttpError } = require('../helpers');
const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const path = require('path'); 
const Jimp = require('jimp')

const register = async (req, res) => {
  const { email, password } = req.body;

  const isExist = await User.findOne({ email });
  if (isExist) {
    throw HttpError(409, 'Email in use');
  }

  const avatarUrl = 'https:' + gravatar.url(email);
  const hashedPassword = await bcrypt.hash(password, 10);

  const { email: userEmail, subscription } = await User.create({
    ...req.body,
    password: hashedPassword,
    avatarUrl,
  });

  res.status(201).json({ user: { userEmail, subscription } });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(409, 'Email or password is wrong');
  }

  const userPasswordCompare = await bcrypt.compare(password, user.password);
  if (!userPasswordCompare) {
    throw HttpError(401, 'Email or password is wrong');
  }

  const token = jwt.sign({ id: user._id }, envsConfigs.secret_key, {
    expiresIn: '23h',
  });
  const findedUser = await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      email: findedUser.email,
      subscription: findedUser.subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email } = req.user;
  res.status(200).json({ email });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: '' });

  res.status(204).json({ message: 'No Content' });
};

const updateAvatar = async (req, res) => {
  const { _id, email } = req.user;
  
  let avatarUrl = null;
  if (req.file) {
    const { path: tempUpload, originalname } = req.file;
    
    const img = await Jimp.read(tempUpload);
    img.resize(250, 250)
    img.write(path.join(__dirname, '../', 'public', 'avatars', `${_id}_${originalname}`))
    avatarUrl = path.join(
      __dirname,
      '../',
      'public',
      'avatars',
      `${_id}_${originalname}`
    );
  } else {
    avatarUrl = 'https:' + gravatar.url(email);
  }
  await User.findByIdAndUpdate(_id, {avatarUrl})

  res.json({"avatarURL": `${avatarUrl}`});
};

module.exports = {
  register: controllerWrapper(register),
  login: controllerWrapper(login),
  getCurrent: controllerWrapper(getCurrent),
  logout: controllerWrapper(logout),
  updateAvatar: controllerWrapper(updateAvatar),
};
