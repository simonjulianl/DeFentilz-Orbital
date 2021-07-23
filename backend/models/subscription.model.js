const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Subscription = sequelize.define(
    "subscriptions",
    {
      endpoint: {
        type: DataTypes.STRING(500), 
        allowNull: false
      }, 
      keys: {
        type: DataTypes.JSON, 
        allowNull: false
      }, 
      userAgent: {
        type: DataTypes.STRING, 
        allowNull: true,
      }
    },
    {
      tableName: "Subscriptions"
    }
  );
  return Subscription;
};