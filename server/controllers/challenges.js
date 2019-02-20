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
        const caller = await UserAccount.findOne({where: {apiId: req.session.user.id}});
        if (!caller) {
            return res.status(404).send({error: "API Caller account not found"});
        }

        const createChallengeResp = await axios.post(`${apiEndpoint}/challenge?userId=${caller.apiId}`, {
            headers: {'Authorization': authHelper.getAuthString(caller.apiKey, caller.secretKey)},
            data: {
                challengeNamespace
            }
        });

        return res.status(createChallengeResp.status).send(createChallengeResp.data);
    },

    async findOneChallenge (req, res) {

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