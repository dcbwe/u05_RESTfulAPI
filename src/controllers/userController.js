const userService = require('../services/userService');
const { toDto } = require('../utils/userSerializer');

class UserController {
    async register(req, res, next) {
        try {
            const user = await userService.register(req.body);
            res.status(201).json(toDto(user));
        } catch (err) {
            next(err);
        }
    }

    async getById(req, res, next) {
        try {
            const user = await userService.getById(req.params.userId);
            if (!user) throw ApiError.notFound('User not found');
            res.json(toDto(user));
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new UserController();
