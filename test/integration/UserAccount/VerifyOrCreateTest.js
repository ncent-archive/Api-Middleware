"use strict";

const userAccountsController = require("../../../server/controllers/userAccounts.js");
const testHelper = require('../../testHelper.js');

module.exports = {
    mocha:describe('Verifying and creating a user', async function () {
        const body = testHelper.createUserReqBody;

        beforeEach(() => {
        });

        it('should return a valid user if the user does not yet exist', async function () {
            testHelper.createNockResponse("POST", "/user", {}, 200, testHelper.createUserNockResp);

            await userAccountsController.verifyOrCreate({body}, new testHelper.pseudoRes(async function (resp) {
                testHelper.expect(typeof resp).to.equal('object');
                testHelper.expect(resp.email).to.equal('dev1@ncnt.io');
            }));
        });

        it('should return a valid user even if the user does already exist', async function () {
            await userAccountsController.verifyOrCreate({body}, new testHelper.pseudoRes(async function (resp) {
                testHelper.createNockResponse("POST", "/user", {}, 403, testHelper.createUserNockResp);

                testHelper.expect(typeof resp).to.equal('object');
                testHelper.expect(resp.email).to.equal('dev1@ncnt.io');
                await testHelper.deleteAllTestUsers();
            }));
        });
    })
};