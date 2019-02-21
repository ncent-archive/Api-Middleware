"use strict";

const challengesController = require("../../../server/controllers/challenges.js");
const testHelper = require("../../testHelper.js");

module.exports = {
    mocha: describe('Finding a single challenge', async function () {
        const session = testHelper.testSession;
        testHelper.createNockResponse("GET", "/challenge", {userId: 1}, 200, testHelper.findAllChallengesNockResp);

        beforeEach(async () => {
            await testHelper.createTestUsers(1);
        });

        afterEach(async () => {
            await testHelper.deleteAllTestUsers();
        });

        it('should return the challenge successfully', async function () {
            await challengesController.findAllChallenges({session}, new testHelper.pseudoRes(async function (resp) {
                testHelper.expect(typeof resp).to.equal('object');
                testHelper.expect(resp.length).to.equal(4);
            }));
        });
    })
};