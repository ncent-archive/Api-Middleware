'use strict';

module.exports = (sequelize, DataTypes) => {
    const ChallengeParticipant = sequelize.define('ChallengeParticipant', {
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
    }, {});
    ChallengeParticipant.associate = function (models) {
        ChallengeParticipant.belongsTo(models.UserAccount, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        });
    };
    return ChallengeParticipant;
};
