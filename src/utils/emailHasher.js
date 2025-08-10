const crypto = require('crypto');

class EmailHasher {
    /**
    * @param {string} email raw
    * @returns {string} sha256-hash
    */
    static hash(email) {
        const normalized = email.toLowerCase().trim();
        return crypto
            .createHmac('sha256', process.env.EMAIL_HASH_SECRET)
            .update(normalized)
            .digest('hex');
    }
};

module.exports = EmailHasher;
