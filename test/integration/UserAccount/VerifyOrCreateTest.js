"use strict";

const UserAccount = require('../../../server/models').UserAccount;
const userAccountsController = require("../../../server/controllers/userAccounts.js");
const testHelper = require('../../testHelper.js');

module.exports = {
    mocha:describe('Verifying and creating a user', async function () {
        const body = testHelper.createUserReqBody;

        it('should return a valid user if the user does not yet exist', async function () {
            testHelper.createNockResponse("POST", "/user", {}, 200, testHelper.createUserNockResp);

            await userAccountsController.verifyOrCreate({body}, new testHelper.pseudoRes(async function (resp) {
                testHelper.expect(typeof resp).to.equal('object');
                testHelper.expect(resp.email).to.equal('dev1@ncnt.io');

                const user = await UserAccount.findOne({where: {email: "dev1@ncnt.io"}});
                testHelper.expect(user.email).to.equal('dev1@ncnt.io');
                await testHelper.deleteAllTestUsers();
            }));
        });
    })
};