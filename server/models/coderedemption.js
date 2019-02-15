'use strict';
module.exports = (sequelize, DataTypes) => {
    const CodeRedemption = sequelize.define('CodeRedemption', {
        referralCode: {
            allowNull: false,
            type: DataTypes.STRING
        }
    }, {});
    CodeRedemption.associate = function (models) {
        CodeRedemption.belongsTo(models.UserAccount, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        });
    };
    return CodeRedemption;
};