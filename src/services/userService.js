const userRepository = require('../repositories/userRepository');
const tokenService = require('./tokenServiceInstance');
const passwordService = require('./passwordServiceInstance');
const { ApiError } = require('../utils/apiError');
const jwtService = require('./jwtServiceInstance');

class UserService {
    /**
     * create user, generate token + expiry
     * @param {{ email: string }} param0
     * @returns {{ user: Object, verificationToken: string }}
     */
    async register({ email }) {
        if (await userRepository.findByEmail(email)) {
            throw ApiError.conflict('email already in use');
        }

        const user = await userRepository.create({ email });
        const { token, expiry } = tokenService.createTokenPayload(16);
        await userRepository.saveVerificationToken(user.id, token, expiry);

        return { user, verificationToken: token };
    }

    /**
     * verify account with token + create password
     * @param {{ token: string, password: string }} param0
     * @returns {Object}
     */
    async verify({ token, password }) {
        const user = await userRepository.findByVerificationToken(token);
        if (!user) 
            throw ApiError.badRequest('invalid or expired token');

        const hash = await passwordService.hash(password);

        user.password                 = hash;
        user.verified                 = true;
        user.verificationToken        = undefined;
        user.verificationTokenExpires = undefined;
        await user.save();

        return user;
    }

    /**
     * fetch user from ID
     */
    async getById(id) {
        return userRepository.findById(id);
    }

    /**
    * login: return user + JWT-token
    * @param {{ email: string, password: string }} param0
    */
    async login({ email, password }) {
        const user = await userRepository.findByEmail(email);
        if (!user || !user.verified) {
            throw ApiError.unauthorized('invalid credentials or account not verified');
        }

        const isMatch = await passwordService.compare(password, user.password);
        if (!isMatch) {
            throw ApiError.unauthorized('invalid credentials');
        }

        const token = jwtService.generate({ userId: user.id });

        return { user, token };
    }
}

module.exports = new UserService();

  