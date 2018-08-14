const mongoose = require('mongoose');

const {
  Schema,
} = mongoose;

const TilSchema = new Schema({
  uid: {
    type: String,
    ref: 'User',
  },
  contents: {
    type: String,
  },
  hash: [{
    type: String,
  }],
  directory: {
    type: Schema.Types.ObjectId,
    ref: 'Directory',
  },
  forkRef: {
    type: Schema.Types.ObjectId,
    ref: 'Til',
  },
  isPrivate: {
    type: Boolean,
    default: false,
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
  usePushEach: true,
});

module.exports = mongoose.model('Til', TilSchema);
