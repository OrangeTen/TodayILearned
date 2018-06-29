const Til = require('mongoose').model('Til');
const Directory = require('mongoose').model('Directory');

module.exports = {
    add(req, res, next) {
        const til = new Til(req.body);
        if(!req.body.directory)req.body.directory = "Inbox";
        Directory.findOne({name: req.body.directory})
                .exec((err, directory)=>{
                    if(err) return console.log(err);
                    if(!directory){
                        return console.log("no directory");
                    }else{
                        til.directory = directory._id;
                        til.save(err => {
                            if (err) return console.log(err);
                            res.json(til);
                    });
                    }
                });
    },
    get(req, res, next) {
        Til.find()
            .populate('directory', {_id:0, created:0, updated:0})
            .exec((err, tils)=>{
                if(err) console.log(err);
                res.json(tils);
            });
    },
    getOne(req, res, next) {
        Til.findById(req.params.tilId)
            .populate('directory', {_id:0, created:0, updated:0})
            .exec((err, til)=>{
                if(err) return console.log(err);
                if(!til) return console.log("no til");
                res.json(til);
            });
    }
};