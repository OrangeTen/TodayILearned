const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DirectorySchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId
    },
    name: {
        type: String
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
    versionKey: false
});

mongoose.model('Directory', DirectorySchema);