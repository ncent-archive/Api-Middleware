"use strict";

const userAccountsController = require("../../../server/controllers/userAccounts.js");
const testHelper = require('../../testHelper.js');

module.exports = {
    mocha:describe('Creating a user', async function () {
        const body = testHelper.createUserReqBody;

        beforeEach(() => {
            testHelper.createNockResponse("POST", "/user", {}, 200, testHelper.createUserNockResp);
        });

        it('should return a valid user with proper parameters', async function () {
            await userAccountsController.createUser({body}, new testHelper.pseudoRes(async function (resp) {
                testHelper.expect(typeof resp).to.equal('object');
                testHelper.expect(resp.userMetadata.email).to.equal('dev1@ncnt.io');
                testHelper.expect(resp.userMetadata.firstname).to.equal('dev1');
                testHelper.expect(resp.userMetadata.lastname).to.equal('ncnt');
            }));
        });

        it('should create a UserAccount in the database with the correct attributes', async function () {
            const users = await testHelper.findAllUsers();
            const newUser = users[0];
            testHelper.expect(newUser.apiId).to.equal(1);
            await testHelper.deleteAllTestUsers();
        });
    })
};