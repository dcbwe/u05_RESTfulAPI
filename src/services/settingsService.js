const settingsRepository = require('../repositories/settingsRepository');
const { ApiError } = require('../utils/apiError');

class SettingsService {
    /**
    * fetch Settings on userId
    * @param {string} userId
    * @returns {Promise<Object>} settings
    */
    async getByUserId(userId) {
        const settings = await settingsRepository.findByUserId(userId);
        if (!settings) throw ApiError.notFound('settings not found');
        return settings;
    }

    /**
    * create or update Settings
    * @param {string} userId
    * @param {Object} data
    * @returns {Promise<Object>} settings
    */
    async updateOrCreateSettings(userId, data) {
        const updatable = (({ language, units, darkMode, notifications:{email, sms} = {} }) =>
            ({ language, units, darkMode, notifications:{email, sms} }))(data);

        const settings = await settingsRepository.upsertByUserId(userId, updatable);
        if (!settings) {
            throw ApiError.internal('failed to upsert settings');
        }
        return settings;
    }
}

module.exports = new SettingsService();
