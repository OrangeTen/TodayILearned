const mongoose = require('mongoose');

const {
  Schema,
} = mongoose;

const DirectorySchema = new Schema({
  name: {
    type: String,
  },
  uid: {
    type: String,
    ref: 'User',
  },
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
});

module.exports = mongoose.model('Directory', DirectorySchema);
