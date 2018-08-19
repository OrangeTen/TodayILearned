const Til = require('../data/models/til');
const config = require('../config');
const popConfig = require('../popConfig.json');
const { OkResponse } = require('../http/responses');
const { loginRequired } = require('../auth');
const {
  BadRequestError,
  DatabaseError,
} = require('../http/errors');

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
  getAllFeed: loginRequired((_, user) => new Promise((res, _rej) => {
    // me and follower's til
    const users = user.following;

    Til.find({
      $or: [{ $and: [{ uid: { $in: users } }, { isPrivate: false }] }, { uid: user._id }],
    }).sort({ created: -1 })
      .populate('directory', popConfig.directory)
      .populate('uid', popConfig.user)
      .sort({ created: -1 })
      .exec((tilErr, tils) => {
        if (tilErr) {
          throw new DatabaseError(tilErr);
        }
        res(new OkResponse(tils));
      });
  })),
  getFeed: loginRequired(({ params: { page } }, user) => new Promise((res, _rej) => {
    if (page <= 0) { // page statrs from 1
      throw new BadRequestError();
    }

    // me and follower's til
    const users = user.following;
    const pageNum = page - 1;

    Til.find({
      $or: [{ $and: [{ uid: { $in: users } }, { isPrivate: false }] }, { uid: user._id }],
    }).sort({ created: -1 })
      .populate('directory', popConfig.directory)
      .populate('uid', popConfig.user)
      .sort({ created: -1 })
      .skip(config.TILInPage * pageNum)
      .limit(config.TILInPage)
      .exec((tilErr, tils) => {
        if (tilErr) {
          throw new DatabaseError(tilErr);
        }
        const maxPage = (tils.length / config.TILInPage) + 1;
        res(new OkResponse({
          page: pageNum,
          maxPage,
          tils,
        }));
      });
  })),
  getFeedAnonymouse: () => new Promise((res, _rej) => {
    Til
      .find({ isPrivate: false })
      .sort({ created: -1 })
      .populate('directory', popConfig.directory)
      .populate('uid', popConfig.user)
      .exec((err, tils) => {
        if (err) {
          throw new DatabaseError(err);
        }
        res(new OkResponse(tils));
      });
  }),
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

};
