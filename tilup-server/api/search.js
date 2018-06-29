const Til = require('mongoose').model('Til');
const User = require('mongoose').model('User');
const {
    BadRequestError,NotExistError
} = require('../error');

module.exports = {
    searchBoth(req, res, next){
        User.findById(req.uid)
        .exec((err, user) => {
            if(err) return console.log(err);
            const users = user.following;
            let word = req.params.word;
            let wordC = '/'+word+'?/'
            Til.find({"$or" : [{"$or" : [{"$and" : [{"uid" : {"$in":users}}, {"isPrivate" : false}]}, {"uid" : user._id}]}, {"$or" : [{"contents" : wordC}, {"hash" : word}]}]})
                .sort({created : -1})
                .populate('directory', {
                    _id: 0,
                    created: 0,
                    updated: 0
                })
                .exec((err, tils)=>{
                    if(err) return console.log(err);
                    res.send(tils);
                });
        });
    },

    searchContents(req, res, next){
        User.findById(req.uid)
        .exec((err, user) => {
            if(err) return console.log(err);
            const users = user.following;
            let wordC = '/'+req.params.word+'?/'
            Til.find({"$and" : [{"$or" : [{"$and" : [{"uid" : {"$in":users}}, {"isPrivate" : false}]}, {"uid" : user._id}]}, {"contents" : wordC}]})
                .sort({created : -1})
                .populate('directory', {
                    _id: 0,
                    created: 0,
                    updated: 0
                })
                .exec((err, tils)=>{
                    if(err) return console.log(err);
                    res.send(tils);
                });
        });
    },

    searchHash(req, res, next){
        User.findById(req.uid)
        .exec((err, user) => {
            if(err) return console.log(err);
            const users = user.following;
            let word = req.params.word;
            Til.find({"$and" : [{"$or" : [{"$and" : [{"uid" : {"$in":users}}, {"isPrivate" : false}]}, {"uid" : user._id}]}, {"hash" : word}]})
                .sort({created : -1})
                .populate('directory', {
                    _id: 0,
                    created: 0,
                    updated: 0
                })
                .exec((err, tils)=>{
                    if(err) return console.log(err);
                    res.send(tils);
                });
        });
    }
};