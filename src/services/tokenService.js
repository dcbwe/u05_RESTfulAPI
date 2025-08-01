const crypto = require('crypto');

/**
 * generate and validate hex-tokens
 */
class TokenService {
    /**
    * @param {Object} options
    * @param {number} [options.expiryMs=86400000] default: 24 h, set in ms
    */
    constructor({ expiryMs = 24*60*60*1000 }) {
        /** @private */
        this.expiryMs = expiryMs;
    }

    /** 
    * generate a random hex token
    * @param {number} [size=16] default: 16-32 chars
    * @returns {string} hexadecimal token
    */
    generateToken(size = 16) {
        return crypto.randomBytes(size).toString('hex');
    }

    /**
    * expiry date for a new token
    * @returns {Date} `Date.now() + expiryMs`
    */
    computeExpiry() {
        return new Date(Date.now() + this.expiryMs);
    }

    /**
    * shortcut for `{ token, expiry }`
    * @param {number} [size] passed to `generateToken()`
    * @returns {{token: string, expiry: Date}}
    */
    createTokenPayload(size) {
        return {
            token:  this.generateToken(size),
            expiry: this.computeExpiry()
        };
    }
}

module.exports = TokenService;
