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

async function verifyOrCreateHelper(user, res, email) {
    console.log("\n\n\ncreateUserResponse created in verifyOrCreate api", user.dataValues, "\n\n\n");

    const otpKey = otplib.authenticator.generateSecret();
    const token = otplib.authenticator.generate(otpKey);
    const otpExp = Date.now() + 300000;
    const salt = bcrypt.genSaltSync();
    const tokenHash = bcrypt.hashSync(token, salt);

    await user.updateAttributes({
        otpKey: tokenHash,
        otpExp: otpExp
    });

    let response = await awsEmail.sendOTP(email, token);
    console.log("aws response", response);
    console.log("\n\n\nverifyOrcreateHelper about to return user in api\n\n\n", user);
    return res.status(200).send(user);
}

module.exports = {
    async createUser(req, res) {
        console.log("\n\n\nhit createUser in userAccounts.js in api\n\n\n");
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
        console.log("\n\n\nhit findOneUser in userAccounts.js in api\n\n\n");
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
        const apiId = req.body.userId;
        const confirmationCode = req.body.code;

        console.log("\n\n\nloginUser in userAccounts in api", apiId, confirmationCode, "\n\n\n");

        const user = await UserAccount.findOne({ where: {apiId} });

        if (!user) {
            return res.status(404).send({ error: "User not found." });
        }

        const expired = Date.now() > user.otpExp;
        const validCode = bcrypt.compareSync(confirmationCode, user.otpKey) && !expired;

        const findUserResp = await axios.get(`${apiEndpoint}/user?userId=${apiId}&id=${apiId}`, {
            headers: {
                'Authorization': authHelper.getAuthString(user.apiKey, user.secretKey)
            }
        });

        if (validCode) {
            await user.updateAttributes({active: true});
            req.session.user = findUserResp.data;
            return res.status(200).send(user);
        }

        return res.status(403).send({ error: "Invalid code.\nYou can request another code if you like." });
    },

    async logoutUser(req, res) {
        console.log("\n\n\nhit logoutUser in userAccounts.js in api\n\n\n");
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
        console.log("\n\n\nhit resetUserAccount in userAccounts.js in api\n\n\n");

    },

    async findAllBalancesForUser(req, res) {
        console.log("\n\n\nhit findAllBalancesForUser in userAccounts.js in api\n\n\n");
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
        // const createUserResponse = await axios.post(`${apiEndpoint}/user`, {
        //         email,
        //         firstname,
        //         lastname
        //     }
        // );
        axios.post(`${apiEndpoint}/user`, {email, firstname, lastname})
        .then(async response => {
            // console.log("\n\n\n.then in post", response);
            console.log("\n\n\nif case scenario in userAccounts, verifyOrCreate, api\n\n\n");
            const newUser = response.data;
            user = await UserAccount.create({
                apiId: newUser.value.id,
                apiKey: newUser.value.apiCreds.apiKey,
                email: email,
                secretKey: newUser.secretKey,
                publicKey: newUser.value.cryptoKeyPair.publicKey,
                privateKey: newUser.privateKey,
                active: false
            });
            verifyOrCreateHelper(user, res, email);
        })
        .catch(async err => {
            // console.log("\n\n\n.catch in post", err);
            console.log("\n\n\nelse case scenario in userAccounts, verifyOrCreate, api\n\n\n");
            user = await UserAccount.findOne({ where: { email } });
            verifyOrCreateHelper(user, res, email);
        });
    },

    async verifySession(req, res) {
        console.log("\n\n\nverifySession", req.session, req.cookies, "\n\n");
        if (req.session.user && req.cookies.session_token) {
            console.log("\n\nverify on backend in session.js, req.session.user", req.session.user, "req.cookies.session_token", req.cookies.session_token);
            const user = await UserAccount.findOne({where: {apiId: req.session.user.id}});
            return res.status(200).send({ sessionVerified: true, user });
        }

        return res.status(403).send({ sessionVerified: false });
    }
};