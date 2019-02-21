"use strict";

const apiEndpoint = "https://faw5rz7094.execute-api.us-west-1.amazonaws.com/development";
const nock = require('nock');
const expect = require('chai').expect;
const UserAccount = require('../server/models').UserAccount;

const reqTypes = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    PATCH: "PATCH",
    DELETE: "DELETE"
};

class pseudoRes {
    constructor(callback) {
        this.sendCallback = callback;
    }

    status(val) {
        return this;
    }

    send(val) {
        return this.sendCallback(val);
    }

    clearCookie(name, options) {
        return "cookie cleared";
    }
}

const testCookies = {session_token: "some_token"};

const testSession = {
    destroy: function () {
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

const createChallengeReqBody = {
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

const createChallengeNockResp = {
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
};

const findAllChallengesNockResp = [ {
    "createdAt" : "2019-01-24T12:36:40.088-08:00",
    "updatedAt" : "null",
    "deletedAt" : "null",
    "parentChallenge" : "null",
    "challengeSettings" : {
        "createdAt" : "2019-01-24T12:36:40.083-08:00",
        "updatedAt" : "null",
        "deletedAt" : "null",
        "name" : "TESTname0",
        "description" : "TESTdescription0",
        "imageUrl" : "TESTimageUrl0",
        "sponsorName" : "TESTsponsorName0",
        "expiration" : "2019-01-25T12:36:40.075-08:00",
        "shareExpiration" : "2019-01-25T12:36:40.075-08:00",
        "admin" : 1,
        "offChain" : false,
        "maxShares" : 100,
        "maxRewards" : "null",
        "maxDistributionFeeReward" : "null",
        "maxSharesPerReceivedShare" : "null",
        "maxDepth" : "null",
        "maxNodes" : "null"
    },
    "subChallenges" : [ ],
    "completionCriteria" : {
        "createdAt" : "2019-01-24T12:36:40.088-08:00",
        "updatedAt" : "null",
        "deletedAt" : "null",
        "address" : "[B@7af25dd1",
        "reward" : {
            "createdAt" : "2019-01-24T12:36:40.088-08:00",
            "updatedAt" : "null",
            "deletedAt" : "null",
            "type" : {
                "createdAt" : "2019-01-24T12:36:40.087-08:00",
                "updatedAt" : "null",
                "deletedAt" : "null",
                "audience" : "PROVIDENCE",
                "type" : "EVEN"
            },
            "pool" : {
                "createdAt" : "2019-01-24T12:36:40.088-08:00",
                "updatedAt" : "null",
                "deletedAt" : "null",
                "cryptoKeyPair" : {
                    "createdAt" : "2019-01-24T12:36:40.088-08:00",
                    "updatedAt" : "null",
                    "deletedAt" : "null",
                    "publicKey" : "[B@4b60eeb3"
                },
                "transactions" : [ ]
            },
            "metadatas" : [ ]
        },
        "prereq" : [ ]
    },
    "cryptoKeyPair" : {
        "createdAt" : "2019-01-24T12:36:40.082-08:00",
        "updatedAt" : "null",
        "deletedAt" : "null",
        "publicKey" : "[B@2d4292b7"
    },
    "distributionFeeReward" : {
        "createdAt" : "2019-01-24T12:36:40.083-08:00",
        "updatedAt" : "null",
        "deletedAt" : "null",
        "type" : {
            "createdAt" : "2019-01-24T12:36:40.082-08:00",
            "updatedAt" : "null",
            "deletedAt" : "null",
            "audience" : "PROVIDENCE",
            "type" : "SINGLE"
        },
        "pool" : {
            "createdAt" : "2019-01-24T12:36:40.083-08:00",
            "updatedAt" : "null",
            "deletedAt" : "null",
            "cryptoKeyPair" : {
                "createdAt" : "2019-01-24T12:36:40.082-08:00",
                "updatedAt" : "null",
                "deletedAt" : "null",
                "publicKey" : "[B@1fc13c0e"
            },
            "transactions" : [ ]
        },
        "metadatas" : [ ]
    }
}, {
    "createdAt" : "2019-01-24T12:36:40.118-08:00",
    "updatedAt" : "null",
    "deletedAt" : "null",
    "parentChallenge" : "null",
    "challengeSettings" : {
        "createdAt" : "2019-01-24T12:36:40.113-08:00",
        "updatedAt" : "null",
        "deletedAt" : "null",
        "name" : "TESTname2",
        "description" : "TESTdescription2",
        "imageUrl" : "TESTimageUrl2",
        "sponsorName" : "TESTsponsorName2",
        "expiration" : "2019-01-25T12:36:40.075-08:00",
        "shareExpiration" : "2019-01-25T12:36:40.075-08:00",
        "admin" : 1,
        "offChain" : false,
        "maxShares" : 100,
        "maxRewards" : "null",
        "maxDistributionFeeReward" : "null",
        "maxSharesPerReceivedShare" : "null",
        "maxDepth" : "null",
        "maxNodes" : "null"
    },
    "subChallenges" : [ ],
    "completionCriteria" : {
        "createdAt" : "2019-01-24T12:36:40.118-08:00",
        "updatedAt" : "null",
        "deletedAt" : "null",
        "address" : "[B@7af25dd1",
        "reward" : {
            "createdAt" : "2019-01-24T12:36:40.118-08:00",
            "updatedAt" : "null",
            "deletedAt" : "null",
            "type" : {
                "createdAt" : "2019-01-24T12:36:40.087-08:00",
                "updatedAt" : "null",
                "deletedAt" : "null",
                "audience" : "PROVIDENCE",
                "type" : "EVEN"
            },
            "pool" : {
                "createdAt" : "2019-01-24T12:36:40.118-08:00",
                "updatedAt" : "null",
                "deletedAt" : "null",
                "cryptoKeyPair" : {
                    "createdAt" : "2019-01-24T12:36:40.117-08:00",
                    "updatedAt" : "null",
                    "deletedAt" : "null",
                    "publicKey" : "[B@1891e690"
                },
                "transactions" : [ ]
            },
            "metadatas" : [ ]
        },
        "prereq" : [ ]
    },
    "cryptoKeyPair" : {
        "createdAt" : "2019-01-24T12:36:40.112-08:00",
        "updatedAt" : "null",
        "deletedAt" : "null",
        "publicKey" : "[B@5b98d389"
    },
    "distributionFeeReward" : {
        "createdAt" : "2019-01-24T12:36:40.113-08:00",
        "updatedAt" : "null",
        "deletedAt" : "null",
        "type" : {
            "createdAt" : "2019-01-24T12:36:40.082-08:00",
            "updatedAt" : "null",
            "deletedAt" : "null",
            "audience" : "PROVIDENCE",
            "type" : "SINGLE"
        },
        "pool" : {
            "createdAt" : "2019-01-24T12:36:40.113-08:00",
            "updatedAt" : "null",
            "deletedAt" : "null",
            "cryptoKeyPair" : {
                "createdAt" : "2019-01-24T12:36:40.112-08:00",
                "updatedAt" : "null",
                "deletedAt" : "null",
                "publicKey" : "[B@2ba5529a"
            },
            "transactions" : [ ]
        },
        "metadatas" : [ ]
    }
}, {
    "createdAt" : "2019-01-24T12:36:40.134-08:00",
    "updatedAt" : "2019-01-24T12:36:40.137-08:00",
    "deletedAt" : "null",
    "parentChallenge" : "1",
    "challengeSettings" : {
        "createdAt" : "2019-01-24T12:36:40.128-08:00",
        "updatedAt" : "null",
        "deletedAt" : "null",
        "name" : "TESTname0",
        "description" : "TESTdescription0",
        "imageUrl" : "TESTimageUrl0",
        "sponsorName" : "TESTsponsorName0",
        "expiration" : "2019-01-25T12:36:40.120-08:00",
        "shareExpiration" : "2019-01-25T12:36:40.120-08:00",
        "admin" : 1,
        "offChain" : false,
        "maxShares" : 100,
        "maxRewards" : "null",
        "maxDistributionFeeReward" : "null",
        "maxSharesPerReceivedShare" : "null",
        "maxDepth" : "null",
        "maxNodes" : "null"
    },
    "subChallenges" : [ {
        "createdAt" : "2019-01-24T12:36:40.134-08:00",
        "updatedAt" : "2019-01-24T12:36:40.137-08:00",
        "deletedAt" : "null",
        "subChallengeId" : 1,
        "type" : "SYNC"
    }, {
        "createdAt" : "2019-01-24T12:36:40.134-08:00",
        "updatedAt" : "2019-01-24T12:36:40.137-08:00",
        "deletedAt" : "null",
        "subChallengeId" : 2,
        "type" : "ASYNC"
    } ],
    "completionCriteria" : {
        "createdAt" : "2019-01-24T12:36:40.134-08:00",
        "updatedAt" : "null",
        "deletedAt" : "null",
        "address" : "[B@7af25dd1",
        "reward" : {
            "createdAt" : "2019-01-24T12:36:40.134-08:00",
            "updatedAt" : "null",
            "deletedAt" : "null",
            "type" : {
                "createdAt" : "2019-01-24T12:36:40.087-08:00",
                "updatedAt" : "null",
                "deletedAt" : "null",
                "audience" : "PROVIDENCE",
                "type" : "EVEN"
            },
            "pool" : {
                "createdAt" : "2019-01-24T12:36:40.133-08:00",
                "updatedAt" : "null",
                "deletedAt" : "null",
                "cryptoKeyPair" : {
                    "createdAt" : "2019-01-24T12:36:40.133-08:00",
                    "updatedAt" : "null",
                    "deletedAt" : "null",
                    "publicKey" : "[B@5878544f"
                },
                "transactions" : [ ]
            },
            "metadatas" : [ ]
        },
        "prereq" : [ ]
    },
    "cryptoKeyPair" : {
        "createdAt" : "2019-01-24T12:36:40.128-08:00",
        "updatedAt" : "null",
        "deletedAt" : "null",
        "publicKey" : "[B@dedad8a"
    },
    "distributionFeeReward" : {
        "createdAt" : "2019-01-24T12:36:40.128-08:00",
        "updatedAt" : "null",
        "deletedAt" : "null",
        "type" : {
            "createdAt" : "2019-01-24T12:36:40.082-08:00",
            "updatedAt" : "null",
            "deletedAt" : "null",
            "audience" : "PROVIDENCE",
            "type" : "SINGLE"
        },
        "pool" : {
            "createdAt" : "2019-01-24T12:36:40.128-08:00",
            "updatedAt" : "null",
            "deletedAt" : "null",
            "cryptoKeyPair" : {
                "createdAt" : "2019-01-24T12:36:40.128-08:00",
                "updatedAt" : "null",
                "deletedAt" : "null",
                "publicKey" : "[B@5c58467e"
            },
            "transactions" : [ ]
        },
        "metadatas" : [ ]
    }
}, {
    "createdAt" : "2019-01-24T12:36:40.103-08:00",
    "updatedAt" : "null",
    "deletedAt" : "null",
    "parentChallenge" : "null",
    "challengeSettings" : {
        "createdAt" : "2019-01-24T12:36:40.097-08:00",
        "updatedAt" : "null",
        "deletedAt" : "null",
        "name" : "TESTname1",
        "description" : "TESTdescription1",
        "imageUrl" : "TESTimageUrl1",
        "sponsorName" : "TESTsponsorName1",
        "expiration" : "2019-01-25T12:36:40.075-08:00",
        "shareExpiration" : "2019-01-25T12:36:40.075-08:00",
        "admin" : 1,
        "offChain" : false,
        "maxShares" : 100,
        "maxRewards" : "null",
        "maxDistributionFeeReward" : "null",
        "maxSharesPerReceivedShare" : "null",
        "maxDepth" : "null",
        "maxNodes" : "null"
    },
    "subChallenges" : [ ],
    "completionCriteria" : {
        "createdAt" : "2019-01-24T12:36:40.103-08:00",
        "updatedAt" : "null",
        "deletedAt" : "null",
        "address" : "[B@7af25dd1",
        "reward" : {
            "createdAt" : "2019-01-24T12:36:40.103-08:00",
            "updatedAt" : "null",
            "deletedAt" : "null",
            "type" : {
                "createdAt" : "2019-01-24T12:36:40.087-08:00",
                "updatedAt" : "null",
                "deletedAt" : "null",
                "audience" : "PROVIDENCE",
                "type" : "EVEN"
            },
            "pool" : {
                "createdAt" : "2019-01-24T12:36:40.103-08:00",
                "updatedAt" : "null",
                "deletedAt" : "null",
                "cryptoKeyPair" : {
                    "createdAt" : "2019-01-24T12:36:40.102-08:00",
                    "updatedAt" : "null",
                    "deletedAt" : "null",
                    "publicKey" : "[B@5c65872d"
                },
                "transactions" : [ ]
            },
            "metadatas" : [ ]
        },
        "prereq" : [ ]
    },
    "cryptoKeyPair" : {
        "createdAt" : "2019-01-24T12:36:40.097-08:00",
        "updatedAt" : "null",
        "deletedAt" : "null",
        "publicKey" : "[B@3f02c814"
    },
    "distributionFeeReward" : {
        "createdAt" : "2019-01-24T12:36:40.098-08:00",
        "updatedAt" : "null",
        "deletedAt" : "null",
        "type" : {
            "createdAt" : "2019-01-24T12:36:40.082-08:00",
            "updatedAt" : "null",
            "deletedAt" : "null",
            "audience" : "PROVIDENCE",
            "type" : "SINGLE"
        },
        "pool" : {
            "createdAt" : "2019-01-24T12:36:40.097-08:00",
            "updatedAt" : "null",
            "deletedAt" : "null",
            "cryptoKeyPair" : {
                "createdAt" : "2019-01-24T12:36:40.097-08:00",
                "updatedAt" : "null",
                "deletedAt" : "null",
                "publicKey" : "[B@713c2b07"
            },
            "transactions" : [ ]
        },
        "metadatas" : [ ]
    }
} ];

const findOneUserNockResp = {
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
};

const createUserNockResp = {
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
};

const createUserReqBody = {
    email: "dev@ncnt.io",
    firstname: "dev",
    lastname: "ncnt"
};

async function createTestUsers(numUsers) {
    for (let i = 1; i <= numUsers; i++) {
        await UserAccount.create({
            apiId: i,
            apiKey: `apiKey${i}`,
            secretKey: `secretKey${i}`,
            publicKey: `publicKey${i}`,
            privateKey: `privateKey${i}`,
            active: "false"
        });
    }
}

async function findAllUsers() {
    return await UserAccount.findAll({where: {}});
}

async function deleteAllTestUsers() {
    await UserAccount.destroy({where: {}});
}

function createNockResponse(reqType, path, queryParams, responseStatus, responseObj) {
    switch (reqType) {
        case reqTypes.GET:
            createNockGetResponse(path, queryParams, responseStatus, responseObj);
            break;
        case reqTypes.POST:
            createNockPostResponse(path, queryParams, responseStatus, responseObj);
            break;
        case reqTypes.PUT:
            createNockPutResponse(path, queryParams, responseStatus, responseObj);
            break;
        case reqTypes.PATCH:
            createNockPatchResponse(path, queryParams, responseStatus, responseObj);
            break;
        case reqTypes.DELETE:
            createNockDeleteResponse(path, queryParams, responseStatus, responseObj);
            break;
        default:
            return;
    }
}

function createNockGetResponse(path, queryParams, responseStatus, responseObj) {
    nock(`${apiEndpoint}`)
        .get(path)
        .query(queryParams)
        .reply(responseStatus, responseObj);
}

function createNockPostResponse(path, queryParams, responseStatus, responseObj) {
    nock(`${apiEndpoint}`)
        .post(path)
        .query(queryParams)
        .reply(responseStatus, responseObj);
}

function createNockPutResponse(path, queryParams, responseStatus, responseObj) {
    nock(`${apiEndpoint}`)
        .put(path)
        .query(queryParams)
        .reply(responseStatus, responseObj);
}

function createNockPatchResponse(path, queryParams, responseStatus, responseObj) {
    nock(`${apiEndpoint}`)
        .patch(path)
        .query(queryParams)
        .reply(responseStatus, responseObj);
}

function createNockDeleteResponse(path, queryParams, responseStatus, responseObj) {
    nock(`${apiEndpoint}`)
        .delete(path)
        .query(queryParams)
        .reply(responseStatus, responseObj);
}

module.exports = {
    expect,
    pseudoRes,
    testSession,
    testCookies,
    createTestUsers,
    deleteAllTestUsers,
    findAllUsers,
    createNockResponse,
    createChallengeReqBody,
    createChallengeNockResp,
    findAllChallengesNockResp,
    createUserReqBody,
    findOneUserNockResp,
    createUserNockResp
};