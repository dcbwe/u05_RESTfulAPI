const userRepository = require('../repositories/userRepository');
const { generateToken } = require('../utils/createToken');
const { ApiError }      = require('../utils/apiError');

class UserService {
    async register({ email }) {
        if (await userRepository.findByEmail(email)) {
            throw ApiError.conflict('Email already in use');
        }
        const verificationToken = generateToken(16);
        return userRepository.create({ email, verificationToken });
    }

    async getById(id) {
        return userRepository.findById(id);
    }
}

module.exports = new UserService();
  