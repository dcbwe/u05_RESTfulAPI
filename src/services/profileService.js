const profileRepository = require('../repositories/profileRepository');
const { ApiError }      = require('../utils/apiError');

class ProfileService {
    /**
    * fetch profile from userId
    * @param {string} userId
    * @returns {Promise<Object>} profile
    */
    async getByUserId(userId) {
        const profile = await profileRepository.findByUserId(userId);
        return profile;
    }

    /**
    * create or update profile
    * @param {string} userId
    * @param {Object} data
    * @returns {Promise<Object>} profile
    */
    async updateOrCreateProfile(userId, data) {
        const updatable = (({ firstname, lastname, birthYear, gender, city, country }) =>
            ({ firstname, lastname, birthYear, gender, city, country }))(data);

        const profile = await profileRepository.upsertByUserId(userId, updatable);
        if (!profile) {
            throw ApiError.internal('Failed to upsert profile');
        }
        return profile;
    }
}

module.exports = new ProfileService();
