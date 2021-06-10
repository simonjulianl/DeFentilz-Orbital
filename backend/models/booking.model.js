<<<<<<< HEAD
const { DataTypes, AsyncQueueError } = require("sequelize");
const moment = require("moment");
=======
const { DataTypes } = require("sequelize");
>>>>>>> origin

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
<<<<<<< HEAD
        get() {
          return moment(this.getDataValue("startingTime"))
            .local()
            .format("YYYY-MM-DD hh:mm:ss");
        },
=======
>>>>>>> origin
      },
      endingTime: {
        type: DataTypes.DATE,
        allowNull: false,
<<<<<<< HEAD
        get() {
          return moment(this.getDataValue("endingTime"))
            .local()
            .format("YYYY-MM-DD hh:mm:ss");
        },
=======
>>>>>>> origin
      },
    },
    {
      tableName: "Bookings",
      indexes: [{ fields: ["startingTime"] }],
<<<<<<< HEAD
=======
      timestamps: false,
>>>>>>> origin
    }
  );

  return Booking;
};
