const { DataTypes } = require("sequelize");
const moment = require("moment");

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
        allowNull: false,
      },
      profilePictureUrl: {
        type: DataTypes.STRING,
        defaultValue:
          "https://bonusdefentilzbucket.s3.ap-southeast-1.amazonaws.com/default_profile_picture.jpeg",
      },
      lastTopUpRequest: {
        type: DataTypes.DATE,
        defaultValue: null,
        allowNull: true,
        get() {
          return moment(this.getDataValue("lastTopUpRequest"))
            .locale("en-SG")
            .format("YYYY-MM-DD HH:mm:ss");
        },
      },
      walletValue: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: "Users",
      indexes: [{ unique: true, fields: ["email"] }, { fields: ["name"] }],
    }
  );

  return User;
};
