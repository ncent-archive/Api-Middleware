"use strict";

const challengesController = require("../../../server/controllers/challenges.js");
const testHelper = require("../../testHelper.js");

module.exports = {
    mocha: describe('Finding a single challenge', async function () {
        const session = testHelper.testSession;
        testHelper.createNockResponse("GET", "/challenge", {userId: 180, id: 1}, 200, testHelper.createChallengeNockResp);

        beforeEach(async () => {
            await testHelper.createTestUsers(1);
        });

        afterEach(async () => {
            await testHelper.deleteAllTestUsers();
        });

        it('should return the challenge successfully', async function () {
            await challengesController.findOneChallenge({params: {challengeId: 1}, session, body: testHelper.createChallengeReqBody}, new testHelper.pseudoRes(async function (resp) {
                testHelper.expect(typeof resp).to.equal('object');
                testHelper.expect(resp.challengeSettings.name).to.equal("TESTname1");
            }));
        });
    })
};