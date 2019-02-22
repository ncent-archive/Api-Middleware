"use strict";

const apiEndpoint = "https://faw5rz7094.execute-api.us-west-1.amazonaws.com/development";
const axios = require("axios");
const axiosRetry = require("axios-retry");
const authHelper = require("../helpers/authHelper.js");
const voucherCodes = require('voucher-code-generator');
const ChallengeParticipant = require('../models').ChallengeParticipant;
const UserAccount = require('../models').UserAccount;
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
        const callerData = await authHelper.findApiCaller(req.session.user.id);
        if (callerData.error) {
            return res.status(callerData.status).send({error: callerData.error});
        }

        const findAllChallengesResp = await axios.get(`${apiEndpoint}/challenge?userId=${callerData.apiId}`, {
            headers: {'Authorization': authHelper.getAuthString(callerData.apiKey, callerData.secretKey)}
        });

        return res.status(findAllChallengesResp.status).send(findAllChallengesResp.data);
    },

    async findAllBalancesForChallenge (req, res) {
        const callerData = await authHelper.findApiCaller(req.session.user.id);
        if (callerData.error) {
            return res.status(callerData.status).send({error: callerData.error});
        }

        const findAllBalancesForChallengeResp = await axios.get(`${apiEndpoint}/challenge/balances?userId=${callerData.apiId}&id=${req.params.challengeId}`, {
            headers: {'Authorization': authHelper.getAuthString(callerData.apiKey, callerData.secretKey)}
        });

        return res.status(findAllBalancesForChallengeResp.status).send(findAllBalancesForChallengeResp.data);
    },

    async shareChallenge (req, res) {
        const {challengeId, publicKeyToShareWith, shares, expiration, emailToShareWith} = req.body;

        const callerData = await authHelper.findApiCaller(req.session.user.id);
        if (callerData.error) {
            return res.status(callerData.status).send({error: callerData.error});
        }

        const shareChallengeResp = await axios.put(`${apiEndpoint}/challenge/share?userId=${callerData.apiId}`, {
            headers: {'Authorization': authHelper.getAuthString(callerData.apiKey, callerData.secretKey)},
            data: {
                challengeId,
                publicKeyToShareWith,
                shares,
                expiration,
                emailToShareWith
            }
        });

        return res.status(shareChallengeResp.status).send(shareChallengeResp.data);
    },

    async redeemChallenge (req, res) {
        const {challengeId, completerPublicKey} = req.body;

        const callerData = await authHelper.findApiCaller(req.session.user.id);
        if (callerData.error) {
            return res.status(callerData.status).send({error: callerData.error});
        }

        const redeemChallengeResp = await axios.put(`${apiEndpoint}/challenge/redeem?userId=${callerData.apiId}`, {
            headers: {'Authorization': authHelper.getAuthString(callerData.apiKey, callerData.secretKey)},
            data: {
                challengeId,
                completerPublicKey
            }
        });

        return res.status(redeemChallengeResp.status).send(redeemChallengeResp.data);
    },

    async completeChallenge (req, res) {
        const {challengeId, completerPublicKey} = req.body;

        const callerData = await authHelper.findApiCaller(req.session.user.id);
        if (callerData.error) {
            return res.status(callerData.status).send({error: callerData.error});
        }

        const completeChallengeResp = await axios.put(`${apiEndpoint}/challenge/complete?userId=${callerData.apiId}`, {
            headers: {'Authorization': authHelper.getAuthString(callerData.apiKey, callerData.secretKey)},
            data: {
                challengeId,
                completerPublicKey
            }
        });

        return res.status(completeChallengeResp.status).send(completeChallengeResp.data);
    },

    async createReferralCode (req, res) {
        const challengeId = req.params.challengeId;

        const callerData = await authHelper.findApiCaller(req.session.user.id);
        if (callerData.error) {
            return res.status(callerData.status).send({error: callerData.error});
        }

        const user = await UserAccount.findOne({where: {apiId: req.session.user.id}});

        const findOneChallengeResp = await axios.get(`${apiEndpoint}/challenge?id=${challengeId}&userId=${callerData.apiId}`, {
            headers: {'Authorization': authHelper.getAuthString(callerData.apiKey, callerData.secretKey)}
        });

        const challenge = findOneChallengeResp.data;

        const referralCode = voucherCodes.generate({
            prefix: `${challenge.challengeSettings.name}-`,
            postfix: `-${challenge.challengeSettings.sponsorName}`
        });

        const challengeParticipant = await ChallengeParticipant.create({
            userId: user.id,
            challengeId,
            referralCode: referralCode[0]
        });

        return res.status(200).send({challengeParticipant});
    },

    async retrieveReferralCode (req, res) {
        const challengeId = req.params.challengeId;
        const user = await UserAccount.findOne({where: {apiId: req.session.user.id}});
        const userId = user.id;

        const challengeParticipant = await ChallengeParticipant.findOne({where: {challengeId, userId}});

        if (!challengeParticipant) {
            return res.status(404).send({error: "Referral Code not found"});
        }

        return res.status(200).send({challengeParticipantId:});
    }
};