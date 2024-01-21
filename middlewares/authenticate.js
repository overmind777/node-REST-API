const jwt = require('jsonwebtoken');

const envsConfigs = require('../configs/envsConfigs');

const { User } = require('../models');
const { HttpError } = require('../helpers');

const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    console.log(1)
    next(HttpError(401));
  }
  try {
    const { id } = jwt.verify(token, envsConfigs.secret_key);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      console.log(2)
      next(HttpError(401));
    }
    req.user = user;
    next();
  } catch {
    
    next(HttpError(401, 'Not authorized' ));
  }
};

module.exports = authenticate;
