const config = require('./config');
const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect(config.MONGODB);
    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log("mongodb connected");
    });

    require('./data/index').User;
    require('./data/index').Til;
    require('./data/index').Directory;

    return db;
}