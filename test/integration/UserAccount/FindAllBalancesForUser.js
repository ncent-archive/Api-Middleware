"use strict";

const userAccountsController = require("../../../server/controllers/userAccounts.js");
const testHelper = require("../../testHelper.js");

module.exports = {
    mocha: describe('Finding a single users balances', async function () {
        const session = testHelper.testSession;
        testHelper.createNockResponse("GET", "/user/balances", {userId: 180}, 200, testHelper.findAllBalancesForUserNockResp);

        beforeEach(async () => {
            await testHelper.createTestUsers(1);
        });

        afterEach(async () => {
            await testHelper.deleteAllTestUsers();
        });

        it('should return the challenge successfully', async function () {
            await userAccountsController.findAllBalancesForUser({session}, new testHelper.pseudoRes(async function (resp) {
                testHelper.expect(typeof resp).to.equal('object');
                testHelper.expect(resp.challengeToUnsharedTransactions.length).to.equal(4);
            }));
        });
    })
};
