'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('UserAccounts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            apiId: {
                allowNull: false,
                unique: true,
                type: Sequelize.INTEGER
            },
            email: {
                allowNull: false,
                unique: true,
                type: Sequelize.STRING
            },
            apiKey: {
                allowNull: false,
                unique: true,
                type: Sequelize.STRING
            },
            secretKey: {
                allowNull: false,
                unique: true,
                type: Sequelize.STRING
            },
            publicKey: {
                allowNull: false,
                unique: true,
                type: Sequelize.STRING
            },
            privateKey: {
                allowNull: false,
                unique: true,
                type: Sequelize.STRING
            },
            otpKey: {
                type: Sequelize.STRING
            },
            otpExp: {
                type: Sequelize.BIGINT
            },
            active: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('UserAccounts');
    }
};