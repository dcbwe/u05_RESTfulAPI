const tokenService = require('./tokenServiceInstance');
const passwordService = require('./passwordServiceInstance');
const { ApiError } = require('../utils/apiError');
const jwtService = require('./jwtServiceInstance');
const settingsService = require('./settingsService');
const EmailHasher = require('../utils/emailHasher');
const profileRepository = require('../repositories/profileRepository');
const userRepository = require('../repositories/userRepository');
const detailsRepository = require('../repositories/detailsRepository');
const settingsRepository = require('../repositories/settingsRepository');
const txManager = require('./transactionManager');

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
            throw ApiError.badRequest('invalid token');

        const hash = await passwordService.hash(password);

        user.password                 = hash;
        user.verified                 = true;
        user.verificationToken        = undefined;
        user.verificationTokenExpires = undefined;
        await user.save();

        await settingsService.updateOrCreateSettings(user.id, {});

        return user;
    }

    /**
    * fetch user from ID
    * @param {string} id
    * @returns {Object|null}
    */
    async getById(id) {
        const user = await userRepository.findById(id);
        if (!user) 
            throw ApiError.notFound('no user found');
        return user;
    }

    /**
    * login: return user + JWT-token
    * @param {{ email: string, password: string }} param0
    * @returns {{ user: Object, token: string }}
    */
    async login({ email, password }) {
        const user = await userRepository.findByEmail(email);
        if (!user) {
            throw ApiError.unauthorized('invalid credentials');
        }

        const isMatch = await passwordService.compare(password, user.password);
        if (!isMatch) {
            throw ApiError.unauthorized('invalid credentials');
        }

        const token = jwtService.generate({ userId: user.id });

        return { user, token };
    }

    /**
    * Soft-delete user + hard delete related data, dispatchar event.
    */
    async deleteAccount(userId) {
        //await txManager.executeWithRetry(async session => {
        await txManager.execute(async session => {
            const user = await userRepository.findById(userId);
            if (!user) throw ApiError.notFound('No user found');

            const hash = EmailHasher.hash(user.email);
            await userRepository.update(userId,
                { active: false, email: undefined, emailHash: hash },
                { session }
            );

            await Promise.all([
                profileRepository.deleteByUserId(userId, { session }),
                detailsRepository.deleteByUserId(userId, { session }),
                settingsRepository.deleteByUserId(userId, { session })
            ]);
        });
    }

}

module.exports = new UserService();

  