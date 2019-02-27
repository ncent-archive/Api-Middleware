"use strict";

const UserAccount = require('../models').UserAccount;
const awsEmail = require("../helpers/awsEmail.js");
const bcrypt = require("bcrypt");
const otplib = require("otplib");
const apiEndpoint = process.env.API;
const axios = require("axios");
const axiosRetry = require("axios-retry");
const authHelper = require("../helpers/authHelper.js");
axiosRetry(axios, {retries: 3, retryDelay: axiosRetry.exponentialDelay});

module.exports = {
    async createUser(req, res) {
        const {email, firstname, lastname} = req.body;
        const createUserResponse = await axios.post(`${apiEndpoint}/user`, {
            email,
            firstname,
            lastname
        });

        const newUser = createUserResponse.data;
        await UserAccount.create({
            apiId: newUser.value.id,
            apiKey: newUser.value.apiCreds.apiKey,
            email: email,
            secretKey: newUser.secretKey,
            publicKey: newUser.value.cryptoKeyPair.publicKey,
            privateKey: newUser.privateKey,
            active: false
        });

        return res.status(createUserResponse.status).send(newUser.value);
    },

    async findOneUser(req, res) {
        const apiId = req.params.userId;
        const user = UserAccount.findOne({where: {apiId}});

        if (!user) {
            return res.status(404).send({error: "UserAccount not found."});
        }

        const caller = await authHelper.findApiCaller(req.session.user.id);
        if (!caller) {
            return res.status(caller.status).send({error: caller.error});
        }

        const findOneUserResp = await axios.get(`${apiEndpoint}/user?userId=${apiId}&id=${apiId}`, {
            headers: {
                'Authorization': authHelper.getAuthString(caller.apiKey, caller.secretKey)
            }
        });

        return res.status(findOneUserResp.status).send(findOneUserResp.data);
    },

    async loginUser(req, res) {
        const apiId = req.params.userId;
        const confirmationCode = req.body.code;

        const user = await UserAccount.findOne({ where: {apiId} });

        if (!user) {
            return res.status(404).send({ error: "User not found." });
        }

        const expired = Date.now() > user.otpExp;
        const validCode = bcrypt.compareSync(confirmationCode, user.otpKey) && !expired;

        const findUserResp = await axios.get(`${apiEndpoint}/user?userId=${apiId}&id=${apiId}`);

        if (validCode) {
            await user.updateAttributes({active: true});
            req.session.user = findUserResp.data;
            return res.status(200).send(findUserResp.data);
        }

        return res.status(403).send({ error: "Invalid code.\nYou can request another code if you like." });
    },

    async logoutUser(req, res) {
        if (req.session.user && req.cookies.session_token) {
            const user = await UserAccount.find({where: {apiId: req.session.user.id}});
            await user.updateAttributes({active: false});
            res.clearCookie("session_token");
            req.session.destroy();
            res.status(200).send({message: "Logged out successfully."});
        } else {
            res.status(403).send({error: "No user session detected."});
        }
    },

    async resetUserAccount(req, res) {

    },

    async findAllBalancesForUser(req, res) {
        const caller = await authHelper.findApiCaller(req.session.user.id);
        if (!caller) {
            return res.status(caller.status).send({error: caller.error});
        }

        const findAllBalancesForUserResp = await axios.get(`${apiEndpoint}/user/balances?userId=${req.session.user.id}`, {
            headers: {
                'Authorization': authHelper.getAuthString(caller.apiKey, caller.secretKey)
            }
        });

        return res.status(findAllBalancesForUserResp.status).send(findAllBalancesForUserResp.data);
    },

    async verifyOrCreate(req, res) {
        let user;
        const {email, firstname, lastname} = req.body;
        const createUserResponse = await axios.post(`${apiEndpoint}/user`, {
            email,
            firstname,
            lastname
        });

        if (createUserResponse.status === 200) {
            console.log("if case scenario");
            const newUser = createUserResponse.data;
            user = await UserAccount.create({
                apiId: newUser.value.id,
                apiKey: newUser.value.apiCreds.apiKey,
                email: email,
                secretKey: newUser.secretKey,
                publicKey: newUser.value.cryptoKeyPair.publicKey,
                privateKey: newUser.privateKey,
                active: false
            });
        } else {
            console.log("else case scenario");
            user = await UserAccount.findOne({where: {email}});
        }

        const otpKey = otplib.authenticator.generateSecret();
        const token = otplib.authenticator.generate(otpKey);
        const otpExp = Date.now() + 300000;
        const salt = bcrypt.genSaltSync();
        const tokenHash = bcrypt.hashSync(token, salt);

        await user.updateAttributes({
            otpKey: tokenHash,
            otpExp: otpExp
        });

        awsEmail.sendOTP(email, token);
        return res.status(200).send(user);
    }
};