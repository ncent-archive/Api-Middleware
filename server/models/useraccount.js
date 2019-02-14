'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserAccount = sequelize.define('UserAccount', {
      apiId: {
          allowNull: false,
          unique: true,
          type: DataTypes.INTEGER
      },
      apiKey: {
          allowNull: false,
          unique: true,
          type: DataTypes.STRING
      },
      secretKey: {
          allowNull: false,
          unique: true,
          type: DataTypes.STRING
      },
      publicKey: {
          allowNull: false,
          unique: true,
          type: DataTypes.STRING
      },
      privateKey: {
          allowNull: false,
          unique: true,
          type: DataTypes.STRING
      },
      otpKey: {
          type: DataTypes.STRING
      },
      otpExp: {
          type: DataTypes.BIGINT
      },
      active: {
          type: DataTypes.BOOLEAN,
          allowNull: false
      }
  }, {});
  UserAccount.associate = function(models) {
    // associations can be defined here
  };
  return UserAccount;
};