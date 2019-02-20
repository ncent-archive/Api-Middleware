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
    mocha:describe('Finding a single user account', async function () {
        let otpKey;
        let token;
        let salt;
        let tokenHash;
        let session;
        let params;
        let cookies;

        beforeEach(async () => {
            otpKey = otplib.authenticator.generateSecret();
            token = otplib.authenticator.generate(otpKey);
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

            await UserAccount.create({
                apiId: 2,
                apiKey: "apiKey2",
                secretKey: "secretKey2",
                publicKey: "publicKey2",
                privateKey: "privateKey2",
                active: "false"
            });

            params = {userId: 1};
            session = {
                destroy: function() {
                    console.log("session deleted");
                },
                user: {
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

            nock(`${apiEndpoint}`)
                .get('/user')
                .query({
                    userId: 1,
                    id: 2
                })
                .reply(200, {
                    "id": 2,
                    "createdAt": "2019-02-18T22:34:51.000Z",
                    "updatedAt": "null",
                    "deletedAt": "null",
                    "userMetadata": {
                        "id": 2,
                        "createdAt": "2019-02-18T22:34:50.000Z",
                        "updatedAt": "null",
                        "deletedAt": "null",
                        "email": "af1@ncnt.io",
                        "firstname": "dev",
                        "lastname": "ncnt",
                        "metadatas": []
                    },
                    "cryptoKeyPair": {
                        "id": 2,
                        "createdAt": "2019-02-18T22:34:51.000Z",
                        "updatedAt": "null",
                        "deletedAt": "null",
                        "publicKey": "[B@1725dc0f"
                    },
                    "apiCreds": {
                        "id": 2,
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

        it('should return the expected user result', async function () {
            await userAccountsController.findOneUser({params, session}, new pseudoRes(async function (resp) {
                expect(typeof resp).to.equal('object');
                expect(resp.id).to.equal(1);
            }));
        });
    })
};