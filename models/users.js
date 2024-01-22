const { Schema, model } = require('mongoose');
const handleMongooseError = require('../helpers/handleMongooseError');

const usersSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: /^\w+([.-_]?\w+)*@\w+([.-_]?\w+)*(\.\w{2,3})+$/,
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
    },
    avatarUrl: {
      type: String,
      // required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

usersSchema.post('save', handleMongooseError);

const User = model('Users', usersSchema);

module.exports = User;
