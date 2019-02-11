"use strict";

const nCentApiEndpoint = "https://faw5rz7094.execute-api.us-west-1.amazonaws.com/development";

module.exports = {
    async createUser (email, firstname, lastname) {

    },

    async findOneUser (callerId, userId) {

    },

    async loginUser (callerId, firstname, lastname) {

    },

    async logoutUser (callerId, firstname, lastname) {

    },

    async resetUserAccount (callerId, firstname, lastname) {

    },

    async findAllBalancesForUser (callerId) {

    },

    async createChallenge (callerId, challengeData) {

    },

    async findOneChallenge (challengeId) {

    },

    async findAllChallenges (callerId) {

    },

    async findAllBalancesForChallenge (callerId, challengeId) {

    },

    async shareChallenge (callerId, challengeId, publicKeyToShareWith, shares, emailToShareWith) {

    },

    async redeemChallenge (callerId, challengeId, redeemerPublicKey) {

    },

    async completeChallenge (callerId, challengeId, redeemerPublicKey) {

    }
};