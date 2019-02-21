"use strict";

const challengesController = require("../../../server/controllers/challenges.js");
const testHelper = require("../../testHelper.js");

module.exports = {
    mocha: describe('Finding a single users balances', async function () {
        const session = testHelper.testSession;
        const params = {challengeId: 4};
        testHelper.createNockResponse("GET", "/challenge/balances", {userId: 1, id: 4}, 200, testHelper.findAllBalancesForChallengeNockResp);

        beforeEach(async () => {
            await testHelper.createTestUsers(1);
        });

        afterEach(async () => {
            await testHelper.deleteAllTestUsers();
        });

        it('should return the challenge successfully', async function () {
            await challengesController.findAllBalancesForChallenge({session, params}, new testHelper.pseudoRes(async function (resp) {
                testHelper.expect(typeof resp).to.equal('object');
                testHelper.expect(resp.emailToChallengeBalances["dev0@ncnt.io"]).to.equal(98);
            }));
        });
    })
};