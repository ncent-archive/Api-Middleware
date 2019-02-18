"use strict";

const UserAccount = require('../models').UserAccount;
const apiEndpoint = process.env.API;
const axios = require("axios");
const axiosRetry = require("axios-retry");
axiosRetry(axios, {retries: 3, retryDelay: axiosRetry.exponentialDelay});

module.exports = {
    async createUser (req, res) {
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
            secretKey: newUser.secretKey,
            publicKey: newUser.value.cryptoKeyPair.publicKey,
            privateKey: newUser.privateKey,
            active: false
        });

        return res.status(createUserResponse.status).send(newUser.value);
    },

    async findOneUser (req, res) {

    },

    async loginUser (req, res) {

    },

    async logoutUser (req, res) {

    },

    async resetUserAccount (req, res) {

    },

    async findAllBalancesForUser (req, res) {

    }
};