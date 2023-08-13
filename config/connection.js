const Sequelize = require('sequelize');
require('dotenv').config();
let sequelize;
// S E Q U E L I Z E
if (process.env.CLEARDB_DATABASE_URL) {
  // Use ClearDB URL if available (Heroku)
  sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL);
} else {
  // Use local environment variables for development
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST || 'localhost',
      dialect: 'mysql',
      port: process.env.DB_PORT || 3306,
    }
  );
}

module.exports = sequelize;