const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    token: {
        type: String
    },
    email: {
        type: String
    },
    name: {
        type: String
    },
    profileUrl: {
        type: String
    },
    follower: [{
        type: Schema.Types.ObjectId
    }],
    following: [{
        type: Schema.Types.ObjectId
    }],
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false,
    usePushEach : true
});

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
UserSchema.path('email').validate(email => emailRegex.test(email), 'Please fill a valid email address');

mongoose.model('User', UserSchema);