"use strict";

const apiEndpoint = "https://faw5rz7094.execute-api.us-west-1.amazonaws.com/development";
const UserAccount = require('../models').UserAccount;
const axios = require("axios");
const axiosRetry = require("axios-retry");
const authHelper = require("../helpers/authHelper.js");
axiosRetry(axios, {retries: 3, retryDelay: axiosRetry.exponentialDelay});

module.exports = {
    async createChallenge (req, res) {
        const challengeNamespace = req.body.challengeNamespace;
        const callerData = await authHelper.findApiCaller(req.session.user.id);
        if (callerData.error) {
            return res.status(callerData.status).send({error: callerData.error});
        }

        const createChallengeResp = await axios.post(`${apiEndpoint}/challenge?userId=${callerData.apiId}`, {
            headers: {'Authorization': authHelper.getAuthString(callerData.apiKey, callerData.secretKey)},
            data: {
                challengeNamespace
            }
        });

        return res.status(createChallengeResp.status).send(createChallengeResp.data);
    },

    async findOneChallenge (req, res) {
        const challengeId = req.params.challengeId;
        const callerData = await authHelper.findApiCaller(req.session.user.id);
        if (callerData.error) {
            return res.status(callerData.status).send({error: callerData.error});
        }

        const findOneChallengeResp = await axios.get(`${apiEndpoint}/challenge?id=${challengeId}&userId=${callerData.apiId}`, {
            headers: {'Authorization': authHelper.getAuthString(callerData.apiKey, callerData.secretKey)}
        });

        return res.status(findOneChallengeResp.status).send(findOneChallengeResp.data);
    },

    async findAllChallenges (req, res) {

    },

    async findAllBalancesForChallenge (req, res) {

    },

    async shareChallenge (req, res) {

    },

    async redeemChallenge (req, res) {

    },

    async completeChallenge (req, res) {

    }
};