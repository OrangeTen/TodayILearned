const Til = require('../data/til');
const Directory = require('../data/directory');
const popConfig = require('../popConfig.json');
const {
  NotExistError,
  BadRequestError,
} = require('../error');

module.exports = {
  add(req, res) {
    const til = new Til(req.body);
    til.uid = req.uid;

    if (!req.body.directory) req.body.directory = 'Inbox'; // default

    Directory
      .findOne({
        name: req.body.directory,
        uid: til.uid,
      })
      .exec((err, directory) => {
        if (err) {
          throw new BadRequestError(err);
        } else if (!directory) {
          throw new NotExistError('No directory');
        }

        til.directory = directory._id;
        til.save((tilErr, savedTil) => {
          if (tilErr) {
            throw new BadRequestError(tilErr);
          }
          res.send(savedTil);
        });
      });
  },

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

  getOne(req, res) {
    Til.findById(req.params.tilId)
      .populate('directory', popConfig.directory)
      .populate('uid', popConfig.user)
      .exec((err, til) => {
        if (err) {
          throw new BadRequestError(err);
        } else if (!til) {
          throw new NotExistError('No TIL');
        }
        res.send(til);
      });
  },

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
