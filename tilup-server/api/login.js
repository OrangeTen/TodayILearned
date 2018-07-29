const User = require('../data/user');
const Directory = require('../data/directory');

const {
  BadRequestError,
} = require('../error');

module.exports = {
  login(req, res) {
    User
      .findById(req.uid)
      .exec((err, user) => {
        if (!user) {
          const newUser = new User({
            _id: req.userRecord.uid,
            email: req.userRecord.email,
            name: req.userRecord.displayName,
            profileUrl: req.userRecord.photoURL,
          });
          newUser
            .save((newUserErr) => {
              if (newUserErr) {
                throw new BadRequestError(newUserErr);
              }
              const directory = new Directory({ name: 'Inbox', uid: newUser._id });
              directory.save((directoryErr) => {
                if (directoryErr) throw new BadRequestError(directoryErr);
              });
            });
        }
      });

    res.status(200).send();
  },
};
