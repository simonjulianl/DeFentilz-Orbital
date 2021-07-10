const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const WalletRequest = sequelize.define(
    "walletRequests",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      value: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
    },
    {
      tableName: "WalletRequest",
    }
  );

  return WalletRequest;
};
