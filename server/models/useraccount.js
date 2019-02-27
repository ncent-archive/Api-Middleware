'use strict';
module.exports = (sequelize, DataTypes) => {
    const UserAccount = sequelize.define('UserAccount', {
        //this is the id as defined in the API itself, not the MW
        apiId: {
            allowNull: false,
            unique: true,
            type: DataTypes.INTEGER
        },
        email: {
            allowNull: false,
            unique: true,
            type: DataTypes.STRING
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
        //stores the one-time passcode for user login
        otpKey: {
            type: DataTypes.STRING
        },
        //stores the expiration of the one-time passcode
        otpExp: {
            type: DataTypes.BIGINT
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {});
    UserAccount.associate = function (models) {
        // associations can be defined here
    };
    return UserAccount;
};