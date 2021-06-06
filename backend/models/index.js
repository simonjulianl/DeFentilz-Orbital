// configuring environment variable setting
const { Sequelize } = require("sequelize");
const dbConfig = require("../config/db.config");

// establish connection with AWS
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  logging: console.log,
  maxConcurrentQueries: 100,
  dialect: "mysql",
  dialectOptions: {
    ssl: "Amazon RDS",
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
    maxConnections: 5,
    maxIdleTime: 30,
  },
  language: "en",
});

// check the connection has been established
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established with AWS");
  })
  .catch((err) => {
    console.log("Unable to connect to the database: ", err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// models
db.facilities = require("./facility.model")(sequelize, Sequelize);

module.exports = db;
