const Til = require('mongoose').model('Til');
const Directory = require('mongoose').model('Directory');
const {
    NotExistError,
    BadRequestError
} = require('../error');

module.exports = {
    add(req, res, next) {
        const til = new Til(req.body);
        til.uid = req.uid;

        if (!req.body.directory)
            req.body.directory = "Inbox"; // default

        Directory
            .findOne({
                name: req.body.directory,
                uid: til.uid
            })
            .exec((err, directory) => {
                if (err) {
                    throw new BadRequestError(err);
                } else if (!directory) {
                    throw new NotExistError("No directory");
                }

                til.directory = directory._id;
                til.save(err => {
                    if (err) {
                        throw new BadRequestError(err);
                    }
                    res.send(til);
                });
            });
    },

    get(req, res, next) {
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
    },

    getOne(req, res, next) {
        Til.findById(req.params.tilId)
            .populate('directory', {
                _id: 0,
                created: 0,
                updated: 0
            })
            .exec((err, til) => {
                if (err) {
                    throw new BadRequestError(err);
                } else if (!til) {
                    throw new NotExistError("No TIL");
                }
                res.send(til);
            });
    },

    fork(req, res, next) {
        Til.findById(req.body.tilId)
            .exec((err, til) => {
                if (err) throw new BadRequestError(err);
                if (!til) throw new NotExistError("No TIL");
                const newTil = new Til({
                    contents: til.contents,
                    hash: til.hash,
                    forkRef: til._id
                });
                newTil.uid = req.uid;
                newTil.save(err => {
                    if (err) return console.log(err);
                    res.send(newTil);
                });
            });
    },

    changeDir(req, res, next) {
        Til.findById(req.params.tilId)
            .exec((err, til) => {
                if (err) return console.log(err);
                Directory.findOne({
                        name: req.body.name
                    })
                    .exec((err, directory) => {
                        if (err) return console.log(err);
                        til.directory = directory._id;
                        til.save(err => {
                            if (err) return console.log(err);
                            res.send(til);
                        });
                    });
            });
    }
};