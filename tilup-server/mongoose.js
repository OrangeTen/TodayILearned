const mongoose = require('mongoose');

const config = require('./config');


module.exports = () => {
  mongoose.connect(config.MONGODB);
  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('mongodb connected');
  });

  return db;
};
