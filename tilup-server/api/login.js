const User = require('mongoose').model('User');
const Directory = require('mongoose').model('Directory');

const {
    NotExistError,
    BadRequestError
} = require('../error');

module.exports = {
    login(req, res, next) {
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
                        .save(err => {
                            if (err) {
                                throw new BadRequestError(err);
                            }
                            const directory = new Directory({name : "Inbox", uid : newUser._id});
                            directory.save(err=>{
                                if(err) throw new BadRequestError(err);
                            });
                        });
                }
            });

        res.status(200).send();
    }
};