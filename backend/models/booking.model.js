const { DataTypes, AsyncQueueError } = require("sequelize");
const moment = require("moment");

module.exports = (sequelize, Sequelize) => {
  const Booking = sequelize.define(
    "bookings",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      startingTime: {
        type: DataTypes.DATE,
        allowNull: false,
        get() {
          return moment(this.getDataValue("startingTime"))
            .local()
            .format("YYYY-MM-DD HH:mm:ss");
        },
      },
      endingTime: {
        type: DataTypes.DATE,
        allowNull: false,
        get() {
          return moment(this.getDataValue("endingTime"))
            .local()
            .format("YYYY-MM-DD HH:mm:ss");
        },
      },
    },
    {
      tableName: "Bookings",
      indexes: [{ fields: ["startingTime"] }],
    }
  );

  return Booking;
};
