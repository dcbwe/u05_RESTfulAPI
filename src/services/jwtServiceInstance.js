const JwtService = require('./jwtService');

const jwtService = new JwtService({
    secret: process.env.JWT_SECRET,
    expiresIn: '1h'
});

module.exports = jwtService;
