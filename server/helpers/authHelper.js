"use strict";

module.exports = {
    getAuthString(apiKey, secretKey) {
        return `Basic ${Buffer.from(`${apiKey}:${secretKey}`).toString('base64')}`;
    }
};