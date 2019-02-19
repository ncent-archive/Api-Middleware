"use strict";

const userAccountsController = require("../../../server/controllers/userAccounts.js");
const UserAccount = require("../../../server/models").UserAccount;
const apiEndpoint = "https://faw5rz7094.execute-api.us-west-1.amazonaws.com/development";
const nock = require('nock');
const expect = require('chai').expect;
const pseudoRes = require('../../utils.js');
const bcrypt = require("bcrypt");
const otplib = require("otplib");

module.exports = {
    mocha:describe('Logging in a user', async function () {
        let otpKey;
        let token;
        let salt;
        let tokenHash;
        let params;
        let successBody;
        let failureBody;
        let session;
        let wrongKey;
        let wrongToken;
        let cookies;

        beforeEach(async () => {
            otpKey = otplib.authenticator.generateSecret();
            wrongKey = otplib.authenticator.generateSecret();
            token = otplib.authenticator.generate(otpKey);
            wrongToken = otplib.authenticator.generate(wrongKey);
            salt = bcrypt.genSaltSync();
            tokenHash = bcrypt.hashSync(token, salt);

            await UserAccount.create({
                apiId: 1,
                apiKey: "apiKey",
                secretKey: "secretKey",
                publicKey: "publicKey",
                privateKey: "privateKey",
                active: "false",
                otpKey: tokenHash,
                otpExp: Date.now() + 300000
            });

            params = {userId: 1};
            successBody = {code: token};
            failureBody = {code: wrongToken};
            session = {
                destroy: function() {
                    console.log("session deleted");
                }
            };
            cookies = {session_token: "some_token"};

            nock(`${apiEndpoint}`)
                .get('/user')
                .query({
                    userId: 1,
                    id: 1
                })
                .reply(200, {
                    "id": 1,
                    "createdAt": "2019-02-18T22:34:51.000Z",
                    "updatedAt": "null",
                    "deletedAt": "null",
                    "userMetadata": {
                        "id": 1,
                        "createdAt": "2019-02-18T22:34:50.000Z",
                        "updatedAt": "null",
                        "deletedAt": "null",
                        "email": "af@ncnt.io",
                        "firstname": "dev",
                        "lastname": "ncnt",
                        "metadatas": []
                    },
                    "cryptoKeyPair": {
                        "id": 1,
                        "createdAt": "2019-02-18T22:34:51.000Z",
                        "updatedAt": "null",
                        "deletedAt": "null",
                        "publicKey": "[B@1725dc0f"
                    },
                    "apiCreds": {
                        "id": 1,
                        "createdAt": "2019-02-18T22:34:51.000Z",
                        "updatedAt": "null",
                        "deletedAt": "null",
                        "apiKey": "[B@7a69b07"
                    }
                });
        });

        afterEach(async () => {
            await UserAccount.destroy({ where: {} });
        });

        it('should return the user object on successful login', async function () {
            await userAccountsController.loginUser({params, body: successBody, session}, new pseudoRes(async function (resp) {
                expect(typeof resp).to.equal('object');
                expect(resp.id).to.equal(1);
            }));
        });

        it('should return a failure message if the code given is incorrect', async function () {
            await userAccountsController.loginUser({params, body: failureBody, session}, new pseudoRes(async function (resp) {
                expect(typeof resp).to.equal('object');
                expect(resp.error).to.equal("Invalid code.\nYou can request another code if you like.");
            }));
        });

        it('should return a success message upon successful logout', async function () {
            await userAccountsController.loginUser({params, body: successBody, session}, new pseudoRes(async function (resp) {
                session.user = resp;
                await userAccountsController.logoutUser({session, cookies}, new pseudoRes(async function (resp2) {
                    expect(typeof resp2).to.equal('object');
                    expect(resp2.message).to.equal("Logged out successfully.");
                }));
            }));
        });
    })
};