require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',
  mongoURI: process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp',
  corsOptions: {
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
  }
};

module.exports = config;