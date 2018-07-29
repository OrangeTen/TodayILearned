const { config } = require('dotenv');


config();

module.exports = {
  SERVER_PORT: process.env.SERVER_PORT,
  MONGODB: process.env.MONGODB,
};
