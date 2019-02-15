"use strict";

const pseudoRes = require('../utils.js');
const userAccountsController = require("../../server/controllers/userAccounts.js");
const should = require('should');

function handleUserCreateResp(user) {
    user.userMetadata.email.should.be.exactly("dev53@ncnt.io");
}

module.exports = {
    mocha:describe('Creating a user', async function() {
        const email = "dev53@ncnt.io";
        const firstname = "dev";
        const lastname = "ncnt";

        const body = {
            email,
            firstname,
            lastname
        };

        const resp = new pseudoRes(handleUserCreateResp);

        it('should return a valid user with proper parameters', async function(){
            await userAccountsController.createUser({body}, resp);
        });
    })
};