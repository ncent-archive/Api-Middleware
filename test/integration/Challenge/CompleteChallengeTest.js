"use strict";

const challengesController = require("../../../server/controllers/challenges.js");
const testHelper = require('../../testHelper.js');

module.exports = {
    mocha: describe('Completing a challenge', async function () {
        const session = testHelper.testSession;
        const params = {userId: 1};
        testHelper.createNockResponse("PUT", '/challenge/complete', {userId: 1}, 200, testHelper.completeChallengeNockResp);

        beforeEach(async () => {
            await testHelper.createTestUsers(1);
        });

        afterEach(async () => {
            await testHelper.deleteAllTestUsers();
        });

        it('should return the reward distribution chain', async function () {
            await challengesController.completeChallenge({params, session, body: testHelper.completeChallengeReqBody}, new testHelper.pseudoRes(async function (resp) {
                testHelper.expect(typeof resp).to.equal('object');
                testHelper.expect(resp.transactions.length).to.equal(2);
            }));
        });
    })
};