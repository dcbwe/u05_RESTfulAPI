const BaseRepository = require('./baseRepository');
const User = require('../models/User');

class UserRepository extends BaseRepository {
    constructor() {
        super(User);
    }

    /**
     * find user by email.
     * @param {string} email
     */
    findByEmail(email) {
        return this.model.findOne({ email });
    }

    /**
     * save token + expiry on user
     * @param {string} userId
     * @param {string} token
     * @param {Date} expiresAt
     */
    saveVerificationToken(userId, token, expiresAt) {
        return this.model.findByIdAndUpdate(
            userId,
            { verificationToken: token, verificationTokenExpires: expiresAt },
            { new: true }
        );
    }

    /**
     * find user from verificationToken
     * @param {string} token
     */
    findByVerificationToken(token) {
        return this.model.findOne({
            verificationToken: token,
            verificationTokenExpires: { $gt: new Date() }
        });
    }

    /**
     * clear verificationToken and flag verified true
     * @param {string} userId
     */
    clearVerificationToken(userId) {
        return this.model.findByIdAndUpdate(
            userId,
            { verified: true, verificationToken: undefined, verificationTokenExpires: undefined },
            { new: true }
        );
    }
}

module.exports = new UserRepository();
