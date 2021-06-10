const { DataTypes } = require("sequelize");

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
      },
      endingTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "Bookings",
      indexes: [{ fields: ["startingTime"] }],
      timestamps: false,
    }
  );

  return Booking;
};
