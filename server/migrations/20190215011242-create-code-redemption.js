'use strict';
module.exports = {
    up: (queryInterface, DataTypes) => {
        return queryInterface.createTable('CodeRedemptions', {
            id: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER
            },
            challengeParticipantId: {
                allowNull: false,
                type: DataTypes.INTEGER,
                foreignKey: true,
                onDelete: 'CASCADE',
                references: {
                    model: 'ChallengeParticipants',
                    key: 'id',
                    as: 'challengeParticipantId'
                }
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
        return queryInterface.dropTable('CodeRedemptions');
    }
};