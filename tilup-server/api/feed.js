const Til = require('../data/til');
const User = require('../data/user');
const popConfig = require('../popConfig.json');
const {
  BadRequestError,
} = require('../error');

module.exports = {
  getFeedWord(req, res) {
    const {
      params: {
        word,
      },
    } = req;

    Til
      .find({ $text: { $search: word } })
      .sort({ created: -1 })
      .exec((err, tils) => {
        if (err) {
          throw new BadRequestError(err);
        }
        res.send(tils);
      });
  },
  getFeed(req, res) { // me and follower's til
    if (req.uid == null) { // login x
      Til
        .find({ isPrivate: false })
        .sort({ created: -1 })
        .populate('directory', popConfig.directory)
        .populate('uid', popConfig.user)
        .exec((err, tils) => {
          if (err) {
            throw new BadRequestError(err);
          }
          res.send(tils);
        });
    } else { // login o
      User.findById(req.uid)
        .exec((err, user) => {
          if (err) {
            console.log(err);
            return;
          }

          const users = user.following;

          Til.find({
            $or: [{ $and: [{ uid: { $in: users } }, { isPrivate: false }] }, { uid: user._id }],
          }).sort({ created: -1 })
            .populate('directory', popConfig.directory)
            .populate('uid', popConfig.user)
            .sort({ created: -1 })
            .exec((tilErr, tils) => {
              if (tilErr) {
                console.log(tilErr);
                return;
              }
              res.send(tils);
            });
        });
    }
  },
  getMyFeed(req, res) {
    Til.find({ uid: req.uid })
      .sort({ created: -1 })
      .populate('directory', popConfig.directory)
      .populate('uid', popConfig.user)
      .sort({ created: -1 })
      .exec((err, tils) => {
        if (err) {
          console.log(err);
          return;
        }
        res.send(tils);
      });
  },
  getAllFeed(req, res) {
    Til
      .find()
      .populate('directory', popConfig.directory)
      .populate('uid', popConfig.user)
      .sort({ created: -1 })
      .exec((err, tils) => {
        if (err) {
          throw new BadRequestError(err);
        }
        res.send(tils);
      });
  },
};
