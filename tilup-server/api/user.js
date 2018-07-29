const User = require('../data/user');
const Directory = require('../data/directory');
const {
  NotExistError,
  BadRequestError,
} = require('../error');

module.exports = {
  add(req, res) {
    const user = new User(req.body);
    if (user._id === req.uid) {
      console.log('user duplicated');
      return;
    }
    user._id = req.uid;
    user
      .save((err) => {
        if (err) {
          throw new BadRequestError(err);
        }
        const directory = new Directory({
          name: 'Inbox',
          uid: user._id,
        });
        directory.save((directoryErr) => {
          if (directoryErr) throw new BadRequestError(directoryErr);
          res.send(user);
        });
      });
  },

  get(req, res) {
    User
      .find()
      .exec((err, users) => {
        if (err) {
          throw new BadRequestError(err);
        }
        res.send(users);
      });
  },

  getOne(req, res) {
    User
      .findById(req.uid)
      .exec((err, user) => {
        if (err) {
          throw new BadRequestError(err);
        } else if (!user) {
          throw new NotExistError('No user');
        }

        res.send(user);
      });
  },

  updateFollow(req, res) {
    User
      .findById(req.uid)
      .exec((myUserErr, myUser) => {
        User
          .findById(req.body.uid)
          .exec((targetUserErr, targetUser) => {
            const followingIndex = myUser.following.indexOf(req.body.uid);
            const followerIndex = targetUser.follower.indexOf(myUser._id);

            if (followingIndex > -1) { // 중복이 존재한다면 삭제
              myUser.following.splice(followingIndex, 1);
              targetUser.follower.splice(followerIndex, 1);
            } else {
              myUser.following.unshift(req.body.uid);
              targetUser.follower.unshift(myUser._id);
            }
            targetUser
              .save((err) => {
                if (err) {
                  throw new BadRequestError(err);
                }
                myUser.save((myUserSaveErr, savedMyUser) => {
                  if (myUserSaveErr) {
                    throw new BadRequestError(myUserSaveErr);
                  }
                  res.send(savedMyUser);
                });
              });
          });
      });
  },
};
