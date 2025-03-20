const { config } = require('dotenv');

config();

module.exports.PORT = process.env.PORT || 3000;

module.exports.DB_USER = process.env.DB_USER || 'root';
module.exports.DB_PASSWORD = process.env.DB_PASSWORD || '';
module.exports.DB_HOST = process.env.DB_HOST || 'localhost';
module.exports.DB_DATABASE = process.env.DB_DATABASE || 'bodas';
module.exports.DB_PORT = process.env.DB_PORT || '3306';