const BaseRepository = require('./baseRepository');
const Profile       = require('../models/Profile');

class ProfileRepository extends BaseRepository {
  constructor() {
    super(Profile);
  }

  /**
   * find profile baserat på userId
   * @param {string} userId
   * @returns {Promise<Object|null>}
   */
  async findByUserId(userId) {
    return this.model.findOne({ userId });
  }

  /**
   * create or update profile
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

module.exports = new ProfileRepository();
