const TokenService = require('./tokenService');

const tokenService = new TokenService({
    expiryMs: 24 * 60 * 60 * 1000
});

module.exports = tokenService;
