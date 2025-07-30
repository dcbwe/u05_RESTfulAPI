const BaseRepository = require('./baseRepository');
const user           = require('../models/User');

class UserRepository extends BaseRepository {
    constructor() {
        super(user);
    }

    findByEmail(email) {
        return this.model.findOne({ email });
    }
}

module.exports = new UserRepository();
