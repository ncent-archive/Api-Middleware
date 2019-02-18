"use strict";

const userAccountsController = require("../../server/controllers/userAccounts.js");
const apiEndpoint = "https://faw5rz7094.execute-api.us-west-1.amazonaws.com/development";
const nock = require('nock');
const expect = require('chai').expect;
const pseudoRes = require('../utils.js');

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
                    value: {
                        userMetadata: {
                            email: "dev@ncnt.io",
                            firstname: "dev",
                            lastname: "ncnt"
                        }
                    }
                });
        });

        it('should return a valid user with proper parameters', async function () {
            await userAccountsController.createUser({body}, new pseudoRes(function (resp) {
                expect(typeof resp).to.equal('object');
                expect(resp.userMetadata.email).to.equal('dev@ncnt.io');
                expect(resp.userMetadata.firstname).to.equal('dev');
                expect(resp.userMetadata.lastname).to.equal('ncnt');
            }));
        });
    })
};