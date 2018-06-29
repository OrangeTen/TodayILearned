const Til = require('mongoose').model('Til');
const User = require('mongoose').model('User');

module.exports = {
    getFeedIAndFollowing(req, res, next){
        
    },
    getFeedAll(req, res, next){
        Til.find()
            .populate('directory', {_id:0, created:0, updated:0})
            .exec((err, tils)=>{
                if(err) console.log(err);
                res.json(tils);
            });
    }
};