"use strict";

const apiEndpoint = "https://faw5rz7094.execute-api.us-west-1.amazonaws.com/development";
const axios = require("axios");
const axiosRetry = require("axios-retry");
axiosRetry(axios, {retries: 3});

module.exports = {
    async createUser (req, res) {
        const {email, firstname, lastname} = req.body;
        const createUserResponse = await axios.post(`${apiEndpoint}/user`, {
            email,
            firstname,
            lastname
        });

        res.status(createUserResponse.status).send(createUserResponse.data.value);
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