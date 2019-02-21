"use strict";

const userAccountsController = require("../../../server/controllers/userAccounts.js");
const testHelper = require('../../testHelper.js');

module.exports = {
    mocha:describe('Sending a one-time passcode to a user email', async function () {
        const params = {
            userId: 1
        };

        beforeEach(async () => {
            await testHelper.createTestUsers(1);
            testHelper.createNockResponse("GET", "/user", {userId: 1, id: 1}, 200, testHelper.findOneUserNockResp);
        });

        afterEach(async () => {
            await testHelper.deleteAllTestUsers();
        });

        it('should return a success message', async function () {
            await userAccountsController.sendOTP({params}, new testHelper.pseudoRes(async function (resp) {
                testHelper.expect(typeof resp).to.equal('object');
                testHelper.expect(resp.message).to.equal("Passcode successfully sent to user");
            }));
        });
    })
};