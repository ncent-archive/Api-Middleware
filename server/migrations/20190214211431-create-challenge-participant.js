'use strict';
module.exports = {
    up: (queryInterface, DataTypes) => {
        return queryInterface.createTable('ChallengeParticipants', {
            id: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER
            },
            userId: {
                allowNull: false,
                type: DataTypes.INTEGER,
                foreignKey: true,
                onDelete: 'CASCADE',
                references: {
                    model: 'UserAccounts',
                    key: 'id',
                    as: 'userId'
                }
            },
            challengeId: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            referralCode: {
                allowNull: false,
                type: DataTypes.STRING(525)
            },
            tokensPerReferral: {
                allowNull: false,
                defaultValue: 1,
                type: DataTypes.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            }
        });
    },
    down: (queryInterface, DataTypes) => {
        return queryInterface.dropTable('ChallengeParticipants');
    }
};