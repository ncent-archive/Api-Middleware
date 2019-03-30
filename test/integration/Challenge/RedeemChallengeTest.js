"use strict";

const challengesController = require("../../../server/controllers/challenges.js");
const testHelper = require('../../testHelper.js');

module.exports = {
    mocha: describe('Redeeming a challenge', async function () {
        const session = testHelper.testSession;
        const params = {userId: 180};
        testHelper.createNockResponse("PUT", '/challenge/redeem', {userId: 180}, 200, testHelper.redeemChallengeNockResp);

        beforeEach(async () => {
            await testHelper.createTestUsers(1);
        });

        afterEach(async () => {
            await testHelper.deleteAllTestUsers();
        });

        it('should return the reward distribution chain', async function () {
            await challengesController.redeemChallenge({params, session, body: testHelper.redeemChallengeReqBody}, new testHelper.pseudoRes(async function (resp) {
                testHelper.expect(typeof resp).to.equal('object');
                console.log(resp);
                testHelper.expect(resp.transactions.length).to.equal(2);
            }));
        });
    })
};