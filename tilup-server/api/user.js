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
            .exec((err, users) => {
                if (err) return console.log(err);
                res.json(users);
            });
    },
    getOne(req, res, next) {
        User.findById(req.params.userId)
            .exec((err, user) => {
                if (err) return console.log(err);
                if (!user) return console.log("no user");
                res.json(user);
            });
    },
    updateFollow(req, res, next) {
        User.findOne({
                token: req.body.token
            })
            .exec((err, me) => {
                User.findById(req.body.uid)
                    .exec((err, user) => {
                        const followingIndex = me.following.indexOf(req.body.uid);
                        const followerIndex = user.follower.indexOf(me._id);

                        if (followingIndex > -1) { //중복이 존재한다면 삭제
                            me.following.splice(followingIndex, 1);
                            user.follower.splice(followerIndex, 1);
                        } else {
                            me.following.unshift(req.body.uid);
                            user.follower.unshift(me._id);
                        }
                        user.save(err =>{
                            if(err) return console.log(err);
                            me.save(err => {
                                if (err) return console.log(err);
                                res.json(me);
                            });
                        });
                    });
            });
    }
};