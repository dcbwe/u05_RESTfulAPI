const detailsRepository = require('../repositories/detailsRepository');
const { ApiError } = require('../utils/apiError');

class DetailsService {
    /**
    * fetch Details on userId
    * @param {string} userId
    * @returns {Promise<Object>} details
    */
    async getByUserId(userId) {
        const details = await detailsRepository.findByUserId(userId);
        if (!details) throw ApiError.notFound('details not found');
        return details;
    }

    /**
    * create or update Details
    * @param {string} userId
    * @param {Object} data
    * @returns {Promise<Object>} details
    */
    async updateOrCreateDetails(userId, data) {
        const updatable = (({ height, weight, dailyRoutine, trainingLevel }) =>
            ({ height, weight, dailyRoutine, trainingLevel }))(data);

        const details = await detailsRepository.upsertByUserId(userId, updatable);
        if (!details) {
            throw ApiError.internal('failed to upsert details');
        }
        return details;
    }
}

module.exports = new DetailsService();
