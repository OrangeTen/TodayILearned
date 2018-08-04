const { loginRequired } = require('../auth');
const {
  createDirectory,
  getDirectoriesWithUid,
  getDirectory,
  removeDirectoryWithDoc,
} = require('../data/directory');
const {
  CreatedResponse,
  DeletedResponse,
  OkResponse,
} = require('../http/responses');

const {
  UnauthorizedError,
  NotExistError,
} = require('../http/errors');

module.exports = {
  add: loginRequired(({ body }, user) => new Promise((res, rej) => {
    Promise.resolve()
      .then(() => createDirectory(user._id, body))
      .then(directory => res(new CreatedResponse(directory)))
      .catch(err => rej(err));
  })),

  // get(req, res) {
  //   Directory.find()
  //     .populate('uid', {
  //       email: 0,
  //       profileUrl: 0,
  //       follower: 0,
  //       following: 0,
  //       created: 0,
  //       updated: 0,
  //     })
  //     .exec((err, directories) => {
  //       if (err) {
  //         throw new BadRequestError(err);
  //       }
  //       res.send(directories);
  //     });
  // },

  getMyDir: loginRequired((_, user) => new Promise((res, rej) => {
    Promise.resolve()
      .then(() => getDirectoriesWithUid(user._id))
      .then(directories => res(new OkResponse(directories)))
      .catch(err => rej(err));
  })),

  del: loginRequired(({ params: { directoryId } }, user) => new Promise((res, rej) => {
    Promise.resolve()
      .then(() => {
        getDirectory(directoryId)
          .then((directory) => {
            if (directory == null) {
              throw new NotExistError();
            }

            if (directory.uid !== user._id) {
              throw new UnauthorizedError();
            }

            removeDirectoryWithDoc(directory)
              .then(() => res(new DeletedResponse()));
          })
          .catch(err => rej(err));
      });
  })),
};
