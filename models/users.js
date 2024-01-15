const { Schema, model } = require('mongoose');
const handleMongooseError = require('../helpers/handleMongooseError');

const usersSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter',
  },
  token: String,
}, {versionKey:false, timestamps: true});

usersSchema.post('save', handleMongooseError);

const Users = model('Users', usersSchema);

module.exports = Users;