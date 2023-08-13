const Sequelize = require('sequelize');
require('dotenv').config();
// S E Q U E L I Z E
const sequelize = new Sequelize(
  process.env.CLEARDB_DATABASE_URL || process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306,
  }
);

module.exports = sequelize;
