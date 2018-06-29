const Til = require('mongoose').model('Til');
const User = require('mongoose').model('User');
const {
    BadRequestError
} = require('../error');

module.exports = {
    getFeed(req, res, next) { // me and follower's til
        this.getAllFeed(req, res, next); // temporally
    },

    getAllFeed(req, res, next) {
        Til
            .find()
            .populate('directory', {
                _id: 0,
                created: 0,
                updated: 0
            })
            .exec((err, tils) => {
                if (err) {
                    throw new BadRequestError(err);
                }
                res.send(tils);
            });
    }
};