const { DatabaseError } = require('../http/errors');
const Directory = require('./models/directory');

module.exports = {
  createDirectory: (uid, name) => new Promise((res, _rej) => {
    if ((!uid) || (!name)) {
      throw new Error('Invalid parameters.');
    }

    const directory = new Directory({
      uid,
      name,
    });

    directory.save((createError, createdDirectory) => {
      if (createError) {
        throw new DatabaseError(createError);
      }
      res(createdDirectory);
    });
  }),

  getDirectoriesWithUid: uid => new Promise((res, _rej) => {
    if ((!uid)) {
      throw new Error('Invalid parameters.');
    }

    Directory.find({ uid })
      .sort({ created: -1 })
      .exec((findError, directories) => {
        if (findError) {
          throw new DatabaseError(findError);
        }

        res(directories);
      });
  }),

  getDirectory: id => new Promise((res, _rej) => {
    if ((!id)) {
      throw new Error('Invalid parameters.');
    }

    Directory.findById(id)
      .exec((findError, directory) => {
        if (findError) {
          throw new DatabaseError(findError);
        }

        res(directory);
      });
  }),

  removeDirectoryWithDoc: doc => new Promise((res, _rej) => {
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
