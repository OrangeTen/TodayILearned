const Directory = require('mongoose').model('Directory');
const User = require('mongoose').model('Directory');
const {
    BadRequestError
} = require('../error');

module.exports = {
    add(req, res, next) {
        const directory = new Directory(req.body);

        directory.save(err => {
            if (err) {
                throw new BadRequestError(err);
            }
            res.send(directory);
        });
    },

    get(req, res, next) {
        Directory.find((err, directories) => {
            if (err) {
                throw new BadRequestError(err);
            }
            res.send(directories);
        });
    },

    getMyDir(req, res, next){
       Directory.find({uid:req.params.uid})
                .sort({created : -1})
                .exec((err, directories)=>{
                    if(err) return console.log(err);
                    res.send(directories);
                });
    }
};