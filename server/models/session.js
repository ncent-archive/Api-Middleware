'use strict';
module.exports = (sequelize, DataTypes) => {
    const session = sequelize.define('session', {
        sid: {
            type: DataTypes.STRING,
            unique: true
        },
        sess: DataTypes.JSON,
        expire: DataTypes.DATE
    }, {});
    session.associate = function (models) {
        // associations can be defined here
    };
    return session;
};