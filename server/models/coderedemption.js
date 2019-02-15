'use strict';
module.exports = (sequelize, DataTypes) => {
    const CodeRedemption = sequelize.define('CodeRedemption', {
    }, {});
    CodeRedemption.associate = function (models) {
        CodeRedemption.belongsTo(models.UserAccount, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        });
        CodeRedemption.belongsTo(models.ChallengeParticipant, {
            foreignKey: 'challengeParticipantId',
            onDelete: 'CASCADE'
        });
    };
    return CodeRedemption;
};