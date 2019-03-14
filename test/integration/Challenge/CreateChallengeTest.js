"use strict";

const challengesController = require("../../../server/controllers/challenges.js");
const testHelper = require('../../testHelper.js');

module.exports = {
    mocha: describe('Creating a challenge', async function () {
        const session = testHelper.testSession;
        const params = {userId: 1};
        testHelper.createNockResponse("POST", '/challenge', {userId: 1}, 200, testHelper.createChallengeNockResp);
        testHelper.createNockResponse("PUT", '/challenge/activate', {userId: 1}, 200, testHelper.createChallengeNockResp);

        beforeEach(async () => {
            await testHelper.createTestUsers(1);
        });

        afterEach(async () => {
            await testHelper.deleteAllTestUsers();
        });

        it('should return the created challenge successfully', async function () {
            await challengesController.createChallenge({params, session, body: testHelper.createChallengeReqBody}, new testHelper.pseudoRes(async function (resp) {
                testHelper.expect(typeof resp).to.equal('object');
                testHelper.expect(resp.challengeSettings.name).to.equal("TESTname1");
            }));
        });
    })
};