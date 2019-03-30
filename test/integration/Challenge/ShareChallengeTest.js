"use strict";

const challengesController = require("../../../server/controllers/challenges.js");
const testHelper = require('../../testHelper.js');

module.exports = {
    mocha: describe('Sharing a challenge', async function () {
        const session = testHelper.testSession;
        const params = {userId: 1};
        testHelper.createNockResponse("PUT", '/challenge/share', {userId: 180}, 200, testHelper.shareChallengeNockResp);

        beforeEach(async () => {
            await testHelper.createTestUsers(1);
        });

        afterEach(async () => {
            await testHelper.deleteAllTestUsers();
        });

        it('should return the created challenge successfully', async function () {
            await challengesController.shareChallenge({params, session, body: testHelper.shareChallengeReqBody}, new testHelper.pseudoRes(async function (resp) {
                testHelper.expect(typeof resp).to.equal('object');
                testHelper.expect(resp.transactions.length).to.equal(1);
            }));
        });
    })
};