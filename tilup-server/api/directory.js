const Directory = require('mongoose').model('Directory');
const User = require('mongoose').model('Directory');
const {
    BadRequestError
} = require('../error');

module.exports = {
    add(req, res, next) {
        const directory = new Directory(req.body);
        if(req.uid == null){
            return res.status(401).json("token is expired");
        }
        directory.uid = req.uid;

        directory.save(err => {
            if (err) {
                throw new BadRequestError(err);
            }
            res.send(directory);
        });
    },

    get(req, res, next) {
        Directory.find()
            .populate('uid',{
                email: 0,
                profileUrl: 0,
                follower: 0,
                following: 0,
                created: 0,
                updated: 0
            })
            .exec((err, directories)=>{
                if (err) {
                    throw new BadRequestError(err);
                }
                res.send(directories);
            }); 
    },

    getMyDir(req, res, next){
       Directory.find({uid:req.uid})
                .sort({created : -1})
                .exec((err, directories)=>{
                    if(err) return console.log(err);
                    res.send(directories);
                });
    }
};