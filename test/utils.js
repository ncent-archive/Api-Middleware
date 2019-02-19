"use strict";

const axios = require('axios');

class psuedoRes {
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

module.exports = psuedoRes;