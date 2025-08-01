// src/services/profileService.js
const profileRepository = require('../repositories/profileRepository');
const { ApiError }      = require('../utils/apiError');

class ProfileService {
    /**
    * Hämta profil baserat på userId
    * @param {string} userId
    * @returns {Promise<Object>} profile
    */
    async getByUserId(userId) {
        const profile = await profileRepository.findByUserId(userId);
        return profile;
    }

    /**
    * Skapar eller uppdaterar profildata.
    * @param {string} userId
    * @param {Object} data
    * @returns {Promise<Object>} profile
    */
    async updateOrCreateProfile(userId, data) {
        // Filtrera tillåtna fält
        const updatable = (({ firstname, lastname, birthYear, gender, city, country }) =>
            ({ firstname, lastname, birthYear, gender, city, country }))(data);

        // Kör upsert – returnerar alltid profilen
        const profile = await profileRepository.upsertByUserId(userId, updatable);
        if (!profile) {
            throw ApiError.internal('Failed to upsert profile');
        }
        return profile;
    }
}

module.exports = new ProfileService();
