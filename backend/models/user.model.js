const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "users",
    {
      email: {
        type: DataTypes.STRING(64),
        unique: true,
        isEmail: true,
        allowNull: false,
        primaryKey: true,
        is: /^[\w-\.]+@u.nus.edu/i,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false 
      },
      walletValue: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
    },
    {
      tableName: "Users",
      indexes: [{ unique: true, fields: ["email"] }, { fields: ["name"] }],
    }
  );

  return User;
};
