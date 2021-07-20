const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Subscription = sequelize.define(
    "subscriptions",
    {
      subscription: {
        type: DataTypes.JSON, 
        allowNull: true
      }
    },
    {
      tableName: "Subscriptions"
    }
  );

  return Subscription;
};
