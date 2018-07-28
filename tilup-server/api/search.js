const Til = require('../data/til');
const User = require('../data/user');

module.exports = {
  searchBoth(req, res) {
    User.findById(req.uid)
      .exec((err, user) => {
        if (err) {
          console.log(err);
          return;
        }
        const users = user.following;
        const {
          params: {
            word,
          },
        } = req;

        const wordC = `/${word}?/`;
        Til.find({
          $or: [
            { $or: [{ $and: [{ uid: { $in: users } }, { isPrivate: false }] }, { uid: user._id }] },
            { $or: [{ contents: wordC }, { hash: word }] },
          ],
        })
          .sort({ created: -1 })
          .populate('directory', {
            _id: 0,
            created: 0,
            updated: 0,
          })
          .exec((tilErr, tils) => {
            if (tilErr) {
              console.log(tilErr);
              return;
            }
            res.send(tils);
          });
      });
  },

  searchContents(req, res, _next) {
    User.findById(req.uid)
      .exec((err, user) => {
        if (err) {
          console.log(err);
          return;
        }
        const users = user.following;
        const wordC = `/${req.params.word}?/`;
        Til.find({
          $and: [{
            $or: [
              { $and: [{ uid: { $in: users } }, { isPrivate: false }] },
              { uid: user._id },
            ],
          }, {
            contents: wordC,
          }],
        })
          .sort({ created: -1 })
          .populate('directory', {
            _id: 0,
            created: 0,
            updated: 0,
          })
          .exec((tilFindErr, tils) => {
            if (tilFindErr) {
              console.log(tilFindErr);
              return;
            }
            res.send(tils);
          });
      });
  },

  searchHash(req, res, _next) {
    User.findById(req.uid)
      .exec((err, user) => {
        if (err) {
          console.log(err);
          return;
        }
        const users = user.following;
        const {
          params: {
            word,
          },
        } = req;

        Til.find({
          $and: [{
            $or: [{ $and: [{ uid: { $in: users } }, { isPrivate: false }] }, { uid: user._id }],
          }, {
            hash: word,
          }],
        })
          .sort({ created: -1 })
          .populate('directory', {
            _id: 0,
            created: 0,
            updated: 0,
          })
          .exec((tilFindErr, tils) => {
            if (tilFindErr) {
              console.log(tilFindErr);
              return;
            }
            res.send(tils);
          });
      });
  },
};
