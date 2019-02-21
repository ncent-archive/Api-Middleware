"use strict";

const UserAccount = require("../models").UserAccount;

module.exports = {
    getAuthString(apiKey, secretKey) {
        return `Basic ${Buffer.from(`${apiKey}:${secretKey}`).toString('base64')}`;
    },

    async findApiCaller(apiId) {
        const caller = await UserAccount.findOne({where: {apiId}});
        if (!caller) {
            return {status: 404, error: "API Caller account not found"};
        }

        return caller;
    }
};