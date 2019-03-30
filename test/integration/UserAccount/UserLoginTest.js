"use strict";

const userAccountsController = require("../../../server/controllers/userAccounts.js");
const UserAccount = require("../../../server/models").UserAccount;
const testHelper = require('../../testHelper.js');
const bcrypt = require("bcrypt");
const otplib = require("otplib");

module.exports = {
    mocha:describe('Logging in a user', async function () {
        let otpKey;
        let token;
        let salt;
        let tokenHash;
        let successBody;
        let failureBody;
        let session;
        let wrongKey;
        let wrongToken;
        const params = {userId: 180};
        const cookies = testHelper.testCookies;

        beforeEach(async () => {
            otpKey = otplib.authenticator.generateSecret();
            wrongKey = otplib.authenticator.generateSecret();
            token = otplib.authenticator.generate(otpKey);
            wrongToken = otplib.authenticator.generate(wrongKey);
            salt = bcrypt.genSaltSync();
            tokenHash = bcrypt.hashSync(token, salt);

            await UserAccount.create({
                apiId: 180,
                apiKey: "apiKey",
                email: "dev1@ncnt.io",
                secretKey: "secretKey",
                publicKey: "publicKey",
                privateKey: "privateKey",
                active: "false",
                otpKey: tokenHash,
                otpExp: Date.now() + 300000
            });

            successBody = {code: token};
            failureBody = {code: wrongToken};
            session = {
                destroy: function() {
                    console.log("session deleted");
                }
            };

            testHelper.createNockResponse("GET", "/user", {userId: 180, id: 180}, 200, testHelper.findOneUserNockResp);
        });

        afterEach(async () => {
            await testHelper.deleteAllTestUsers();
        });

        it('should return the user object on successful login', async function () {
            await userAccountsController.loginUser({params, body: successBody, session}, new testHelper.pseudoRes(async function (resp) {
                console.log("LOGIN RESP", resp);
                testHelper.expect(typeof resp).to.equal('object');
                testHelper.expect(resp.apiId).to.equal(180);
            }));
        });

        it('should return a failure message if the code given is incorrect', async function () {
            await userAccountsController.loginUser({params, body: failureBody, session}, new testHelper.pseudoRes(async function (resp) {
                testHelper.expect(typeof resp).to.equal('object');
                testHelper.expect(resp.error).to.equal("Invalid code.\nYou can request another code if you like.");
            }));
        });

        it('should return a success message upon successful logout', async function () {
            await userAccountsController.loginUser({params, body: successBody, session}, new testHelper.pseudoRes(async function (resp) {
                session.user = resp;
                await userAccountsController.logoutUser({session, cookies}, new testHelper.pseudoRes(async function (resp2) {
                    testHelper.expect(typeof resp2).to.equal('object');
                    testHelper.expect(resp2.message).to.equal("Logged out successfully.");
                }));
            }));
        });
    })
};