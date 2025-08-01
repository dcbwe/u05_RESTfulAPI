const bcrypt = require('bcrypt');

class PasswordService {
    constructor({ saltRounds = 12, hashFn = bcrypt.hash, compareFn = bcrypt.compare }) {
        this.saltRounds = saltRounds;
        this.hashFn     = hashFn;
        this.compareFn  = compareFn;
    }

    /** @returns {Promise<string>} */
    async hash(password) {
        return this.hashFn(password, this.saltRounds);
    }

    /**
    * @returns {Promise<boolean>}
    */
    async compare(plain, hash) {
        return this.compareFn(plain, hash);
    }
}

module.exports = PasswordService;
