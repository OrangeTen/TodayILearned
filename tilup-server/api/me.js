const User = require('mongoose').model('User');
const {
    NotExistError,
} = require('../error');

module.exports = {
    get(req, res, next) {
        User
            .findOne({
                token: req.query.token
            })
            .exec((err, user) => {
                if (err) {
                    throw new NotExistError(err);
                }
                res.send(user);
            });
    }
};