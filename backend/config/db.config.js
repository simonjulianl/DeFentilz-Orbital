module.exports = {
  HOST: "bonus-database.cqkdhpa3gwxf.ap-southeast-1.rds.amazonaws.com",
  USER: "bonusadmin",
  PASSWORD: "bonusadmin",
  DB: "bonusDatabase",
  PORT: 3306,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
