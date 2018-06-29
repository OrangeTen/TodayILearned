const Til = require('mongoose').model('Til');
const User = require('mongoose').model('User');
const {
    BadRequestError,NotExistError
} = require('../error');

module.exports = {
    getFeed(req, res, next) { // me and follower's til
        if(req.uid == null){    // login x
            Til
            .find({isPrivate : false})
            .sort({created : -1})
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
        }else{                  // login o
            User.findById(req.uid)
            .exec((err, user) => {
                if(err) return console.log(err);
                
                const users = user.following;
                
                Til.find({"$or" : [{"$and" : [{"uid" : {"$in":users}}, {"isPrivate" : false}]}, {"uid" : user._id}]})
                    .sort({created : -1})
                    .populate('directory', {
                        _id: 0,
                        created: 0,
                        updated: 0
                    })
                    .sort({created : -1})
                    .exec((err, tils)=>{
                        if(err) return console.log(err);
                        res.send(tils);
                    });
            });   
        }
    },
    getMyFeed(req, res, next){
        Til.find({"uid" : req.uid})
            .sort({created : -1})
            .populate('directory', {
                _id: 0,
                created: 0,
                updated: 0
            })
            .sort({created : -1})
            .exec((err, tils)=>{
                if(err) return console.log(err);
                res.send(tils);
            });
    },
    getAllFeed(req, res, next) {
        Til
            .find()
            .populate('directory', {
                _id: 0,
                created: 0,
                updated: 0
            })
            .sort({created : -1})
            .exec((err, tils) => {
                if (err) {
                    throw new BadRequestError(err);
                }
                res.send(tils);
            });
    }
};