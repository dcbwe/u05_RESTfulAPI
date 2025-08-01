const jwt = require('jsonwebtoken');

class JwtService {
    constructor({ secret, expiresIn = '1h', signFn = jwt.sign, verifyFn = jwt.verify }) {
        this.secret    = secret;
        this.expiresIn = expiresIn;
        this.signFn    = signFn;
        this.verifyFn  = verifyFn;
    }

    /**
     * @param {Object} payload
     * @returns {string}
     */
    generate(payload) {
        return this.signFn(payload, this.secret, { expiresIn: this.expiresIn });
    }

    /**
     * @param {string} token
     * @returns {Object} decoded payload
     */
    verify(token) {
        return this.verifyFn(token, this.secret);
    }
}

module.exports = JwtService;
