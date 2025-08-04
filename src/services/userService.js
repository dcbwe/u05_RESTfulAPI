const userRepository = require('../repositories/userRepository');
const tokenService = require('./tokenServiceInstance');
const passwordService = require('./passwordServiceInstance');
const { ApiError } = require('../utils/apiError');
const jwtService = require('./jwtServiceInstance');
const settingsService = require('./settingsService');
const mongoose       = require('mongoose');
const crypto         = require('crypto');
const profileRepo     = require('../repositories/profileRepository');
const detailsRepo     = require('../repositories/detailsRepository');
const settingsRepo    = require('../repositories/settingsRepository');

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
    * soft-delete user, hard-delete profile, details & settings
    * @param {string} userId
    */
    async deleteAccount(userId) {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const user = await userRepository.findById(userId);
            if (!user) throw ApiError.notFound('no user');

            const normalized = user.email.toLowerCase().trim();
            const hmac       = crypto.createHmac('sha256', process.env.EMAIL_HASH_SECRET);
            const hash       = hmac.update(normalized).digest('hex');

            await userRepository.update(
                userId,
                { active: false, email: undefined, emailHash: hash },
                { session }
            );

            await profileRepo.deleteByUserId(userId,  { session });
            await detailsRepo.deleteByUserId(userId,  { session });
            await settingsRepo.deleteByUserId(userId, { session });

            await session.commitTransaction();
            session.endSession();
        } catch (err) {
            await session.abortTransaction();
            session.endSession();
            throw err;
        }
    }
}

module.exports = new UserService();

  