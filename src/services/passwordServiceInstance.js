const PasswordService = require('./passwordService');

const passwordService = new PasswordService({
    saltRounds: 12
});

module.exports = passwordService;
