"use strict";

const userAccountsController = require("../../../server/controllers/userAccounts.js");
const testHelper = require('../../testHelper.js');

module.exports = {
    mocha:describe('Finding a single user account', async function () {
        const params = {userId: 180};
        const session = testHelper.testSession;

        beforeEach(async () => {
            await testHelper.createTestUsers(2);
            testHelper.createNockResponse("GET", "/user", {userId: 180, id: 180}, 200, testHelper.findOneUserNockResp);
        });

        afterEach(async () => {
            await testHelper.deleteAllTestUsers();
        });

        it('should return the expected user result', async function () {
            await userAccountsController.findOneUser({params, session}, new testHelper.pseudoRes(async function (resp) {
                testHelper.expect(typeof resp).to.equal('object');
                testHelper.expect(resp.id).to.equal(180);
            }));
        });
    })
};