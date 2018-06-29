const User = require('mongoose').model('User');
const {
    NotExistError,
    BadRequestError
} = require('../error');

module.exports = {
    add(req, res, next) {
        const user = new User(req.body);
        user
            .save(err => {
                if (err) {
                    throw new BadRequestError(err);
                }
                res.send(user);
            });
    },

    get(req, res, next) {
        User
            .find()
            .exec((err, users) => {
                if (err) {
                    throw new BadRequestError(err);
                }
                res.send(users);
            });
    },

    getOne(req, res, next) {
        User
            .findById(req.params.userId)
            .exec((err, user) => {
                if (err) {
                    throw new BadRequestError(err);
                } else if (!directory) {
                    throw new NotExistError("No user");
                }

                res.send(user);
            });
    },

    updateFollow(req, res, next) {
        User
            .findOne({
                token: req.body.token
            })
            .exec((err, me) => {
                User
                    .findById(req.body.uid)
                    .exec((err, user) => {
                        const followingIndex = me.following.indexOf(req.body.uid);
                        const followerIndex = user.follower.indexOf(me._id);

                        if (followingIndex > -1) { //중복이 존재한다면 삭제
                            me.following.splice(followingIndex, 1);
                            user.follower.splice(followerIndex, 1);
                        } else {
                            me.following.unshift(req.body.uid);
                            user.follower.unshift(me._id);
                        }
                        user
                            .save(err => {
                                if (err) {
                                    throw new BadRequestError(err);
                                }
                                me.save(err => {
                                    if (err) {
                                        throw new BadRequestError(err);
                                    }
                                    res.send(me);
                                });
                            });
                    });
            });
    }
};