const cors = require('cors');
const CORSConfig = require('../middleware/CORSConfig');

const corsConfig = new CORSConfig({
  allowedOrigins: process.env.CORS_ORIGINS.split(','), 
  credentials:    true,
});

module.exports = cors(corsConfig.getOptions());

  