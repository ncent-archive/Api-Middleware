"use strict";

const userAccountsController = require("../../../server/controllers/userAccounts.js");
const UserAccount = require("../../../server/models").UserAccount;
const apiEndpoint = "https://faw5rz7094.execute-api.us-west-1.amazonaws.com/development";
const nock = require('nock');
const expect = require('chai').expect;
const pseudoRes = require('../../utils.js');

const params = {
    userId: 1
};

module.exports = {
    mocha:describe('Sending a one-time passcode to a user email', async function () {
        beforeEach(async () => {
            await UserAccount.create({
                apiId: 1,
                apiKey: "apiKey",
                secretKey: "secretKey",
                publicKey: "publicKey",
                privateKey: "privateKey",
                active: "false"
            });

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

        it('should return a success message', async function () {
            await userAccountsController.sendOTP({params}, new pseudoRes(async function (resp) {
                expect(typeof resp).to.equal('object');
                expect(resp.message).to.equal("Passcode successfully sent to user");
            }));
        });
    })
};