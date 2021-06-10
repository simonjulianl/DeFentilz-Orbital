const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Reward = sequelize.define(
    "rewards",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      issueDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      expiryDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(512),
        defaultValue: "BoNUS Voucher :)",
        validate: { notEmpty: true },
      },
      value: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
    },
    {
      tableName: "Rewards",
    }
  );

  return Reward;
};
