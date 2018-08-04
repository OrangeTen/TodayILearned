const { Til } = require('../data/models');
const Directory = require('../data/models/directory');
const {
  getTil,
  removeTilWithDoc,
} = require('../data/til');
const popConfig = require('../popConfig.json');
const { loginRequired } = require('../auth');
const {
  CreatedResponse,
  OkResponse,
  DeletedResponse,
} = require('../http/responses');
const {
  NotExistError,
  BadRequestError,
  UnauthorizedError,
} = require('../http/errors');

module.exports = {
  add: loginRequired((bindParams, user) => new Promise((res, _rej) => {
    const til = new Til(bindParams);

    const {
      _id: uid,
    } = user;
    til.uid = uid;
    const directory = bindParams.directory ? bindParams.directory : 'Inbox';

    Directory
      .findOne({
        uid,
        name: directory,
      })
      .exec((findDirectoryError, foundDirectory) => {
        if (findDirectoryError) {
          throw new NotExistError('No directory', findDirectoryError);
        }

        til.directory = foundDirectory._id;
        til.save((tilErr, savedTil) => {
          if (tilErr) {
            throw new BadRequestError(tilErr);
          }
          res(new CreatedResponse(savedTil));
        });
      });
  })),

  get(req, res) {
    Til
      .find()
      .populate('directory', popConfig.directory)
      .populate('uid', popConfig.user)
      .exec((err, tils) => {
        if (err) {
          throw new BadRequestError(err);
        }
        res.send(tils);
      });
  },

  getOne: ({ tilId }, _) => new Promise((res, rej) => {
    Promise.resolve()
      .then(() => getTil(tilId))
      .then((til) => {
        if (!til) {
          rej(new NotExistError('No TIL'));
        }

        res(new OkResponse(til));
      })
      .catch(err => rej(err));
  }),

  del: loginRequired(({ tilId }, user) => new Promise((res, rej) => {
    Promise.resolve()
      .then(() => {
        getTil(tilId)
          .then((til) => {
            if (til == null) {
              throw new NotExistError();
            }

            if (til.uid !== user._id) {
              throw new UnauthorizedError();
            }

            removeTilWithDoc(til)
              .then(() => res(new DeletedResponse()));
          })
          .catch(err => rej(err));
      });
  })),

  fork(req, res) {
    Til.findById(req.body.tilId)
      .exec((err, til) => {
        if (err) throw new BadRequestError(err);
        if (!til) throw new NotExistError('No TIL');
        const newTil = new Til({
          contents: til.contents,
          hash: til.hash,
          forkRef: til._id,
        });
        newTil.uid = req.uid;
        newTil.save((tilSaveErr) => {
          if (tilSaveErr) {
            console.log(tilSaveErr);
            return;
          }
          res.send(newTil);
        });
      });
  },

  changeDir(req, res) {
    Til.findById(req.params.tilId)
      .exec((err, til) => {
        if (err) {
          console.log(err);
          return;
        }
        Directory.findOne({
          name: req.body.name,
        })
          .exec((findDirectoryErr, directory) => {
            if (findDirectoryErr) {
              console.log(findDirectoryErr);
              return;
            }
            Til.update({ _id: til._id }, { directory: directory._id }, (updateErr, updatedTil) => {
              if (updateErr) {
                console.log(updateErr);
                return;
              }
              res.send(updatedTil);
            });
          });
      });
  },
};
