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
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      imageUrl: {
        type: DataTypes.STRING,
        defaultValue:
          "https://bonusdefentilzbucket.s3.ap-southeast-1.amazonaws.com/default_image_facility.jpeg",
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "NUS",
      },
      type: {
        type: DataTypes.ENUM("SPORT", "MEETING", "STUDY", "OTHER"),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(512),
        defaultValue: "An NUS Facility :)",
        validate: { notEmpty: true },
      },
      rating: {
        type: DataTypes.FLOAT,
      },
      rate: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
    },
    {
      tableName: "Facilities",
      indexes: [
        { fields: ["name"] },
        { fields: ["type"] },
        { fields: ["location"] },
      ],
    }
  );

  return Facility;
};
