"use strict";

const nCentApiEndpoint = "https://faw5rz7094.execute-api.us-west-1.amazonaws.com/development";

module.exports = {
    async createUser (email, firstname, lastname) {

    },

    async findOneUser (userId) {

    },

    async loginUser () {

    },

    async logoutUser () {

    },

    async resetUserAccount (firstname, lastname) {

    },

    async findAllBalancesForUser () {

    },

    async createChallenge (challengeData) {

    },

    async findOneChallenge (challengeId) {

    },

    async findAllChallenges () {

    },

    async findAllBalancesForChallenge (challengeId) {

    },

    async shareChallenge (challengeId, publicKeyToShareWith, shares, emailToShareWith) {

    },

    async redeemChallenge (challengeId, redeemerPublicKey) {

    },

    async completeChallenge (challengeId, redeemerPublicKey) {

    }
};