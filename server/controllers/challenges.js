"use strict";

const apiEndpoint = process.env.API;
// console.log("\n\nchallengesJS controller middleware, apiEndpoint being used is", apiEndpoint);
const axios = require("axios");
const axiosRetry = require("axios-retry");
const authHelper = require("../helpers/authHelper.js");
const voucherCodes = require('voucher-code-generator');
const ChallengeParticipant = require('../models').ChallengeParticipant;
const UserAccount = require('../models').UserAccount;
axiosRetry(axios, {retries: 3, retryDelay: axiosRetry.exponentialDelay});
const { BitlyClient } = require('bitly');
const bitly = new BitlyClient(process.env.BITLY, {});

module.exports = {
    async createChallenge (req, res) {
        console.log("\n\nhit createChallenge in challenges controller api-middleware", req.body.challenge);
        const challengeNamespace = req.body.challenge.challengeNamespace;
        // const callerData = await authHelper.findApiCaller(req.session.user.id);
        const callerData = await authHelper.findApiCaller(1);
        console.log("\ncallerData returned as", callerData.dataValues);
        if (callerData.error) {
            return res.status(callerData.status).send({error: callerData.error});
        }
        console.log("\nabout to send following obj to aws endpoing for challenge creation", {"challengeNamespace": challengeNamespace});
        const createChallengeResp = await axios.post(`${apiEndpoint}/challenge?userId=${callerData.apiId}`, 
            {
                challengeNamespace
            },
            {
                headers: {'Authorization': authHelper.getAuthString(callerData.apiKey, callerData.secretKey)},
            }
        );
        console.log("about to activate challenge, challengeId", createChallengeResp.data.id.toString(), "endpoint", `${apiEndpoint}/challenge/activate?userId=${callerData.apiId}`);
        let challengeActivationResp = await axios.put(`${apiEndpoint}/challenge/activate?userId=${callerData.apiId}`,
            {
                challengeId: createChallengeResp.data.id.toString()
            },
            {
                headers: { 'Authorization': authHelper.getAuthString(callerData.apiKey, callerData.secretKey) },
            }
        );
        console.log("challengeActivation returned", challengeActivationResp.data);
        console.log("\nleaving createChallenge in api-middleware\n\n");
        return res.status(createChallengeResp.status).send(createChallengeResp.data);
    },

    async findOneChallenge (req, res) {
        const challengeId = req.params.challengeId;
        // const callerData = await authHelper.findApiCaller(req.session.user.id);
        console.log("\nhit findOneChallenge middleware");
        const callerData = await authHelper.findApiCaller(150);
        if (callerData.error) {
            return res.status(callerData.status).send({error: callerData.error});
        }

        const findOneChallengeResp = await axios.get(`${apiEndpoint}/challenge?id=${challengeId}&userId=${callerData.apiId}`, {
            headers: {'Authorization': authHelper.getAuthString(callerData.apiKey, callerData.secretKey)}
        });

        return res.status(findOneChallengeResp.status).send(findOneChallengeResp.data);
    },

    async findAllChallenges (req, res) {
        // const callerData = await authHelper.findApiCaller(req.session.user.id);
        console.log("\n\nhit findAllChallenges middleware");
        const callerData = await authHelper.findApiCaller(150);
        if (callerData.error) {
            return res.status(callerData.status).send({error: callerData.error});
        }

        const findAllChallengesResp = await axios.get(`${apiEndpoint}/challenge?userId=${callerData.apiId}`, {
            headers: {'Authorization': authHelper.getAuthString(callerData.apiKey, callerData.secretKey)}
        });

        return res.status(findAllChallengesResp.status).send(findAllChallengesResp.data);
    },

    async findAllBalancesForChallenge (req, res) {
        console.log("\n\n\nHit findAllBalancesForChallenge in challenges controller, middlewareapi, challengeId", req.params.challengeId);
        // const callerData = await authHelper.findApiCaller(req.session.user.id);
        const callerData = await authHelper.findApiCaller(150);
        if (callerData.error) {
            return res.status(callerData.status).send({error: callerData.error});
        }

        const findAllBalancesForChallengeResp = await axios.get(`${apiEndpoint}/challenge/balances?userId=${callerData.apiId}&challengeId=${req.params.challengeId}`, {
            headers: {'Authorization': authHelper.getAuthString(callerData.apiKey, callerData.secretKey)}
        });

        return res.status(findAllBalancesForChallengeResp.status).send(findAllBalancesForChallengeResp.data);
    },

    async shareChallenge (req, res) {
        let sharerApiId;
        const { challengeId, shares, expiration, referralCode } = req.body;        
        console.log("\n\n\ntop of shareChallenge api-middleware", "referralCode", referralCode, "shares", shares, "expiration", expiration, "referralCode", referralCode);

        const publicKeyToShareWith = req.session.user.cryptoKeyPair.publicKey;
        const emailToShareWith = req.session.user.userMetadata.email;

        const challengeParticipant = await ChallengeParticipant.findOne({where: {referralCode}});
        if (challengeParticipant) {
            const sharerAccountId = challengeParticipant.userId;
            const sharerAccount = await UserAccount.findOne({where: {id: sharerAccountId}});
            sharerApiId = sharerAccount.apiId;
        } else {
            sharerApiId = 150;
        }

        console.log("\n\n\nsharerAccount in shareChallenge", 
            "sharerApiId",
            sharerApiId,
            "publicKeyToShareWith",
            publicKeyToShareWith,
            "emailToShareWith",
            emailToShareWith
        );

        const callerData = await authHelper.findApiCaller(sharerApiId);

        if (callerData.error) {
            return res.status(callerData.status).send({error: callerData.error});
        }

        console.log("\n\nabout to query aws at", `${apiEndpoint}/challenge/share?userId=${callerData.apiId}`, "reqBody contains", challengeId, publicKeyToShareWith, shares, expiration, emailToShareWith);
        const shareChallengeResp = await axios.put(`${apiEndpoint}/challenge/share?userId=${callerData.apiId}`, 
            {
                challengeId,
                publicKeyToShareWith,
                shares,
                expiration,
                emailToShareWith
            },
            {
                headers: {'Authorization': authHelper.getAuthString(callerData.apiKey, callerData.secretKey)}
            }
        );

        return res.status(shareChallengeResp.status).send(shareChallengeResp.data);
    },

    async redeemChallenge (req, res) {
        const {challengeId, completerPublicKey} = req.body;

        // const callerData = await authHelper.findApiCaller(req.session.user.id);
        const callerData = await authHelper.findApiCaller(1);
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
        console.log("\n\n\nhit completeChallenge in challenges controller in middlewareapi");
        const {challengeId, completerEmail} = req.body;
        const stringifiedChallengeId = JSON.stringify(challengeId);

        const userAccount = await UserAccount.findOne({where: {email: completerEmail}});
        console.log("\nuserAccount returned in completeChallenge", userAccount.dataValues);
        const completerPublicKey = userAccount.publicKey;

        // const callerData = await authHelper.findApiCaller(req.session.user.id);
        const callerData = await authHelper.findApiCaller(150);
        if (callerData.error) {
            return res.status(callerData.status).send({error: callerData.error});
        }

        console.log("\nabout to completeChallenge send to aws from controller", "challengeId", typeof challengeId, challengeId, typeof stringifiedChallengeId, stringifiedChallengeId, "completerPublicKey", completerPublicKey, "endpoint is (put)", `${apiEndpoint}/challenge/complete?userId=${callerData.apiId}`, "authString", authHelper.getAuthString(callerData.apiKey, callerData.secretKey));
        const completeChallengeResp = await axios.put(`${apiEndpoint}/challenge/complete?userId=${callerData.apiId}`,  {
                challengeId,
                completerPublicKey
            },
            {
                headers: {'Authorization': authHelper.getAuthString(callerData.apiKey, callerData.secretKey)}
            }
        );

        return res.status(completeChallengeResp.status).send(completeChallengeResp.data);
    },

    async createReferralCode (req, res) {
        const challengeId = req.params.challengeId;
        let callerData;
       

        if (req.session.user) {
            callerData = await authHelper.findApiCaller(req.session.user.id);
        } else {
            callerData = await authHelper.findApiCaller(1);
        }

        if (callerData.error) {
            return res.status(callerData.status).send({error: callerData.error});
        }

        let user;
        if (req.session.user) {
            user = await UserAccount.findOne({ where: { apiId: req.session.user.id } });
        } else {
            user = await UserAccount.findOne({ where: { apiId: 1 } });
        }

        const existingChallengeParticipant = await ChallengeParticipant.findOne({
            where: {
                userId: user.id,
                challengeId
            }
        });

        //Existing code returned
        if (existingChallengeParticipant) return res.status(200).send({ 
            challengeParticipant: existingChallengeParticipant 
        });

        const findOneChallengeResp = await axios.get(`${apiEndpoint}/challenge?id=${challengeId}&userId=${callerData.apiId}`, {
            headers: {'Authorization': authHelper.getAuthString(callerData.apiKey, callerData.secretKey)}
        });

        const challenge = findOneChallengeResp.data;

        const referralCode = voucherCodes.generate({
            prefix: `${challenge.challengeSettings.name.replace(/ /g, "_")}`,
            postfix: `${challenge.challengeSettings.sponsorName.replace(/ /g, "_")}`
        });

        const challengeParticipant = await ChallengeParticipant.create({
            userId: user.id,
            challengeId,
            referralCode: referralCode[0]
        });

        //If new code created
        return res.status(201).send({challengeParticipant});
    },

    async retrieveReferralCode (req, res) {
        const challengeId = req.params.challengeId;
        let user;
        if (req.session.user) {
            user = await UserAccount.findOne({where: {apiId: req.session.user.id}});
        } else {
            user = await UserAccount.findOne({ where: { apiId: 1 } });
        }
        const userId = user.id;

        const challengeParticipant = await ChallengeParticipant.findOne({where: {challengeId, userId}});

        if (!challengeParticipant) {
            return res.status(404).send({error: "Referral Code not found"});
        }

        return res.status(200).send({challengeParticipant});
    }
};