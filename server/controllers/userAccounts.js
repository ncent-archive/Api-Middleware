"use strict";

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

        return res.status(createUserResponse.status).send(createUserResponse.data.value);
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