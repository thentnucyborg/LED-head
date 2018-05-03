require('dotenv').config();

const config = {
  address: process.env.ADDRESS || 'localhost',
  port: process.env.PORT || 8080,
  autoStart: process.env.AUTO_START || false,
  autoStartShow: process.env.AUTO_START_SHOW || 1,
  frequency: process.env.FREQUENCY || 1000,
  startDelay: process.env.START_DELAY || 500,
};

module.exports = config;
