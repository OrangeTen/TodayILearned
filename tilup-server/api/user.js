const User = require('mongoose').model('User');

module.exports = {
    add(req, res, next) {
        const user = new User(req.body);
        user.save(err => {
            if (err) return console.log(err);
            res.json(user);
        });
    },
    get(req, res, next) {
        User.find()
            .exec((err, users)=>{
                if(err) return console.log(err);
                res.json(users);
            });
    },
    getOne(req, res, next) {
        User.findById(req.params.userId)
            .exec((err, user)=>{
                if(err) return console.log(err);
                if(!user) return console.log("no user");
                res.json(user);
            });
    }
};