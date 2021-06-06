const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Facility = sequelize.define(
    "facilities",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      type: {
        type: DataTypes.ENUM("SPORT", "MEETING", "STUDY", "OTHER"),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        defaultValue:
          "An NUS facility :), waiting for more detailed description to be filled in",
      },
      rating: {
        type: DataTypes.FLOAT,
      },
    },
    {
      tableName: "Facilities",
      indexes: [{ unique: true, fields: ["Name"] }],
    }
  );

  return Facility;
};
