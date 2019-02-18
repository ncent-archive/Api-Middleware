"use strict";

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
}

module.exports = psuedoRes;