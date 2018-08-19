const { config } = require('dotenv');

config();

const TILInPage = 5;

module.exports = {
  TILInPage,
  SERVER_PORT: process.env.SERVER_PORT,
  MONGODB: process.env.MONGODB,
};
