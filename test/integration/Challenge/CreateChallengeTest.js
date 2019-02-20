"use strict";

const UserAccount = require("../../../server/models").UserAccount;
const challengesController = require("../../../server/controllers/challenges.js");
const apiEndpoint = "https://faw5rz7094.execute-api.us-west-1.amazonaws.com/development";
const nock = require('nock');
const expect = require('chai').expect;
const pseudoRes = require('../../utils.js');

module.exports = {
    mocha: describe('Creating a challenge', async function () {
        let session;
        let cookies;
        const params = {userId: 1};
        const body = {
            "challengeNamespace": {
                "challengeSettings": {
                    "admin": 1,
                    "description": "TESTdescription0",
                    "expiration": "2019-02-02T00:35:01.441Z",
                    "imageUrl": "TESTimageUrl0",
                    "maxShares": 100,
                    "name": "TESTname1",
                    "offChain": false,
                    "shareExpiration": "2019-02-02T00:35:01.441Z",
                    "sponsorName": "TESTsponsorName0"

                },
                "completionCriteria": {
                    "address": "[B@28e7acf0",
                    "prereq": [],
                    "reward": {
                        "type": {
                            "audience": "PROVIDENCE",
                            "type": "EVEN"
                        }
                    }
                },
                "distributionFeeReward": {
                    "type": {
                        "audience": "PROVIDENCE",
                        "type": "SINGLE"
                    }
                },
                "subChallenges": []
            }
        };

        session = {
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
            .post('/challenge')
            .query({
                userId: 1
            })
            .reply(200, {
                "id": 1,
                "createdAt": "2019-02-20T19:26:12.396Z",
                "updatedAt": "null",
                "deletedAt": "null",
                "parentChallenge": "null",
                "challengeSettings": {
                    "id": 1,
                    "createdAt": "2019-02-20T19:26:12.000Z",
                    "updatedAt": "null",
                    "deletedAt": "null",
                    "name": "TESTname1",
                    "description": "TESTdescription0",
                    "imageUrl": "TESTimageUrl0",
                    "sponsorName": "TESTsponsorName0",
                    "expiration": "2019-02-02T00:35:01.000Z",
                    "shareExpiration": "2019-02-02T00:35:01.000Z",
                    "admin": 1,
                    "offChain": false,
                    "maxShares": 100,
                    "maxRewards": "null",
                    "maxDistributionFeeReward": "null",
                    "maxSharesPerReceivedShare": "null",
                    "maxDepth": "null",
                    "maxNodes": "null"
                },
                "subChallenges": [],
                "completionCriteria": {
                    "id": 1,
                    "createdAt": "2019-02-20T19:26:12.000Z",
                    "updatedAt": "null",
                    "deletedAt": "null",
                    "address": "[B@28e7acf0",
                    "reward": {
                        "id": 1,
                        "createdAt": "2019-02-20T19:26:12.000Z",
                        "updatedAt": "null",
                        "deletedAt": "null",
                        "type": {
                            "id": 1,
                            "createdAt": "2019-02-14T20:50:15.000Z",
                            "updatedAt": "null",
                            "deletedAt": "null",
                            "audience": "PROVIDENCE",
                            "type": "EVEN"
                        },
                        "pool": {
                            "id": 1,
                            "createdAt": "2019-02-20T19:26:12.000Z",
                            "updatedAt": "null",
                            "deletedAt": "null",
                            "cryptoKeyPair": {
                                "id": 1,
                                "createdAt": "2019-02-20T19:26:12.000Z",
                                "updatedAt": "null",
                                "deletedAt": "null",
                                "publicKey": "[B@1d9b7cce"
                            },
                            "transactions": []
                        },
                        "metadatas": []
                    },
                    "prereq": []
                },
                "cryptoKeyPair": {
                    "id": 1,
                    "createdAt": "2019-02-20T19:26:12.000Z",
                    "updatedAt": "null",
                    "deletedAt": "null",
                    "publicKey": "[B@6973b51b"
                },
                "distributionFeeReward": {
                    "id": 1,
                    "createdAt": "2019-02-20T19:26:12.000Z",
                    "updatedAt": "null",
                    "deletedAt": "null",
                    "type": {
                        "id": 1,
                        "createdAt": "2019-02-14T20:50:15.000Z",
                        "updatedAt": "null",
                        "deletedAt": "null",
                        "audience": "PROVIDENCE",
                        "type": "SINGLE"
                    },
                    "pool": {
                        "id": 1,
                        "createdAt": "2019-02-20T19:26:12.000Z",
                        "updatedAt": "null",
                        "deletedAt": "null",
                        "cryptoKeyPair": {
                            "id": 2,
                            "createdAt": "2019-02-20T19:26:12.000Z",
                            "updatedAt": "null",
                            "deletedAt": "null",
                            "publicKey": "[B@479d31f3"
                        },
                        "transactions": []
                    },
                    "metadatas": []
                }
            });


        beforeEach(async () => {
            await UserAccount.create({
                apiId: 1,
                apiKey: "apiKey",
                secretKey: "secretKey",
                publicKey: "publicKey",
                privateKey: "privateKey",
                active: "false"
            });
        });

        afterEach(async () => {
            await UserAccount.destroy({ where: {} });
        });

        it('should return the created challenge successfully', async function () {
            await challengesController.createChallenge({params, session, body}, new pseudoRes(async function (resp) {
                expect(typeof resp).to.equal('object');
                expect(resp.challengeSettings.name).to.equal("TESTname1");
            }));
        });
    })
};