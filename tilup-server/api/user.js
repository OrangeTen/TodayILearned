const { User, Directory } = require('../data/models');
const { getUser, getAllUsers } = require('../data/user');
const { loginRequired } = require('../auth');
const {
  UpdatedResponse,
  OkResponse,
} = require('../http/responses');
const {
  NotExistError,
  BadRequestError,
  DatabaseError,
} = require('../http/errors');

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

  getAll: (_bindParams, _user) => new Promise((res, _rej) => {
    getAllUsers().then((users) => {
      res(new OkResponse(users));
    });
  }),

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

  updateFollow: loginRequired(
    ({ body: { uid: targetUid } }, myUser) => new Promise((resolveRequest, rejectRequest) => {
      if (targetUid === myUser._id) {
        return rejectRequest(new BadRequestError('Cannot follow yourself.'));
      }

      return getUser(targetUid)
        .then((targetUser) => {
          if (!targetUser) {
            rejectRequest(new BadRequestError('Invalid target user'));
          }

          const followingIndex = myUser.following.indexOf(targetUid);
          const followerIndex = targetUser.follower.indexOf(myUser._id);
          if (followingIndex > -1) { // 중복이 존재한다면 삭제
            myUser.following.splice(followingIndex, 1);
            targetUser.follower.splice(followerIndex, 1);
          } else {
            myUser.following.unshift(targetUid);
            targetUser.follower.unshift(myUser._id);
          }

          Promise.resolve()
            .then(() => new Promise((res, _rej) => {
              targetUser.save((err) => {
                if (err) {
                  throw new DatabaseError(err);
                }

                res();
              });
            }))
            .then(() => new Promise((res, _rej) => {
              myUser.save((err, savedMyUser) => {
                if (err) {
                  throw new DatabaseError(err);
                }

                res(savedMyUser);
              });
            }))
            .then(savedMyUser => resolveRequest(new UpdatedResponse(savedMyUser)));
        });
    }),
  ),
};
