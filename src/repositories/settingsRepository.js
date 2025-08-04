const BaseRepository = require('./baseRepository');
const Settings = require('../models/Settings');

class SettingsRepository extends BaseRepository {
    constructor() {
        super(Settings);
    }

    /**
    * find Settings from userId
    * @param {string} userId
    * @returns {Promise<Object|null>}
    */
    async findByUserId(userId) {
        return this.model.findOne({ userId });
    }

    /**
    * create or update Settings
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

module.exports = new SettingsRepository();