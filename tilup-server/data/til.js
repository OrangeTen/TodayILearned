const { Til } = require('./models');
const popConfig = require('../popConfig.json');
const {
  DatabaseError,
} = require('../http/errors');


module.exports = {
  getTil: id => new Promise((res, _rej) => {
    if ((!id)) {
      throw new Error('Invalid parameters.');
    }

    Til.findById(id)
      .populate('directory', popConfig.directory)
      .populate('user', popConfig.user)
      .exec((err, til) => {
        if (err) {
          throw new DatabaseError(err);
        }

        res(til);
      });
  }),

  removeTilWithDoc: doc => new Promise((res, _rej) => {
    if ((!doc)) {
      throw new Error('Invalid parameters.');
    }

    doc.remove((err) => {
      if (err) {
        throw new DatabaseError(err);
      }

      res();
    });
  }),
};
