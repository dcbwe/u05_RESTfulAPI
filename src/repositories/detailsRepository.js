const BaseRepository = require('./baseRepository');
const Details = require('../models/Details');

class DetailsRepository extends BaseRepository {
    constructor() {
        super(Details);
    }

    /**
    * find Details from userId
    * @param {string} userId
    * @returns {Promise<Object|null>}
    */
    async findByUserId(userId) {
        return this.model.findOne({ userId });
    }

    /**
    * create or update Details
    * @param {string} userId
    * @param {Object} data
    */
    async upsertByUserId(userId, data) {
        return this.upsert(
            { userId },
            { $set: data, $setOnInsert: { userId } }
        );
    }
}

module.exports = new DetailsRepository();
