const { config } = require('dotenv');

require('dotenv').config()

const configuration = {
    agService:{
    host: process.env.AG_HOST,
    port: process.env.AG_PORT
    },
  authService: {
    host: process.env.AUTH_HOST,
    port: process.env.AUTH_PORT
  },
  convertVideoService: {
    host: process.env.CONVERT_HOST,
    port: process.env.CONVERT_PORT
  },
  notificationService: {
    host: process.env.NOTIFICATION_HOST,
    port: process.env.NOTIFICATION_PORT
  }
};

module.exports = configuration;