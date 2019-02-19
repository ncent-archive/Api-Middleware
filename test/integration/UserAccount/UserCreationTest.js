"use strict";

const userAccountsController = require("../../../server/controllers/userAccounts.js");
const UserAccount = require("../../../server/models").UserAccount;
const apiEndpoint = "https://faw5rz7094.execute-api.us-west-1.amazonaws.com/development";
const nock = require('nock');
const expect = require('chai').expect;
const pseudoRes = require('../../utils.js');

const body = {
    email: "dev@ncnt.io",
    firstname: "dev",
    lastname: "ncnt"
};

module.exports = {
    mocha:describe('Creating a user', async function () {
        beforeEach(() => {
            nock(`${apiEndpoint}`)
                .post('/user')
                .reply(200, {
                    "value": {
                        "id": 1,
                        "createdAt": "2019-02-18T22:34:51.067Z",
                        "updatedAt": "null",
                        "deletedAt": "null",
                        "userMetadata": {
                            "id": 1,
                            "createdAt": "2019-02-18T22:34:50.000Z",
                            "updatedAt": "null",
                            "deletedAt": "null",
                            "email": "dev@ncnt.io",
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
                    },
                    "privateKey": "[C@31368b99",
                    "secretKey": "[C@50b472aa"
                });
        });

        it('should return a valid user with proper parameters', async function () {
            await userAccountsController.createUser({body}, new pseudoRes(async function (resp) {
                expect(typeof resp).to.equal('object');
                expect(resp.userMetadata.email).to.equal('dev@ncnt.io');
                expect(resp.userMetadata.firstname).to.equal('dev');
                expect(resp.userMetadata.lastname).to.equal('ncnt');
            }));
        });

        it('should create a UserAccount in the database with the correct attributes', async function () {
            const users = await UserAccount.findAll({ where: {} });
            const newUser = users[0];
            expect(newUser.apiId).to.equal(1);
            await UserAccount.destroy({ where: {} });
        })
    })
};