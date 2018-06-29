const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TilSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId
    },
    uid: {
        type: String
    },
    contents: {
        type: String
    },
    hash: [{
        type: String
    }],
    directory: {
        type: Schema.Types.ObjectId,
        ref: 'Directory'
    },
    forkRef: {
        type: Schema.Types.ObjectId,
        ref: 'Til'
    },
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

mongoose.model('Til', TilSchema);