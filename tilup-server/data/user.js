const mongoose = require('mongoose');
const { emailRegex } = require('../utils/regex');

const {
  Schema,
} = mongoose;

const UserSchema = new Schema({
  _id: {
    type: String,
  },
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  profileUrl: {
    type: String,
  },
  follower: [{
    type: String,
  }],
  following: [{
    type: String,
  }],
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
}, {
  versionKey: false,
  usePushEach: true,
});

UserSchema.path('email').validate(email => emailRegex.test(email), 'Please fill a valid email address');

module.exports = mongoose.model('User', UserSchema);
