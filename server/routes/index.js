"use strict";

const challengesController = require('../controllers').challenges;
const userAccountsController = require('../controllers').userAccounts;

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the nCent API Middleware!'
    }));

    //creates a new user account
    app.post("/api/users", userAccountsController.createUser);

    //retrieves one user account
    app.get("/api/users/:userId", userAccountsController.findOneUser);

    //sends a one-time passcode to the user for login
    app.post("/api/users/:userId", userAccountsController.sendOTP);

    //logs a user in and begins their session
    app.post("/api/users/login", userAccountsController.loginUser);

    //logs a user out and ends their session
    app.post("/api/users/logout", userAccountsController.logoutUser);

    //resets a user's account details
    app.patch("/api/users/reset", userAccountsController.resetUserAccount);

    //retrieves all challenge balances carried by a particular user
    app.get("/api/users/balances", userAccountsController.findAllBalancesForUser);

    //creates a new challenge (with the logged in user as the sponsor)
    app.post("/api/challenges", challengesController.createChallenge);

    //retrieves a single challenge by ID
    app.get("/api/challenges/:challengeId", challengesController.findOneChallenge);

    //finds all challenges stored at the API level
    app.get("/api/challenges", challengesController.findAllChallenges);

    //finds all user account balances for a single given challenge
    app.get("/api/challenges/balances", challengesController.findAllBalancesForChallenge);

    //shares a challenge from one user to another
    app.patch("/api/challenges/share", challengesController.shareChallenge);

    //redeems a challenge for a participant - triggered by the sponsor only
    app.patch("/api/challenges/redeem", challengesController.redeemChallenge);

    //completes a challenge by redeeming for a participant - triggered by the sponsor only
    app.patch("/api/challenges/complete", challengesController.completeChallenge);

    //creates a unique code for a user participating in a challenge
    app.post("/api/challenges/referralCode", challengesController.createReferralCode);

    //retrieve's a user's unique challenge referral code
    app.get("/api/challenges/referralCode", challengesController.retrieveReferralCode);
};