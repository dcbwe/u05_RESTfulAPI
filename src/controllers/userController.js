const userService  = require('../services/userService');
const { toUserDto } = require('../utils/userSerializer');
const { ApiError } = require('../utils/apiError');

class UserController {
    async register(req, res, next) {
        try {
            const { user, verificationToken } = await userService.register(req.body);
            res.status(201).json({
                user: toUserDto(user),
                verificationToken 
            });
        } catch (err) {
            next(err);
        }
    }

    async verify(req, res, next) {
        try {
            const { token, password } = req.body;
            const user = await userService.verify({ token, password });
            res.json({
                user: toUserDto(user),
                message: 'account verified'
            });
        } catch (err) {
            next(err);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const { user, token } = await userService.login({ email, password });
            res.json({
                user: toUserDto(user),
                token });
        } catch (err) {
            next(err);
        }
    }

    async getById(req, res, next) {
        try {
            const user = await userService.getById(req.params.userId);
            if (!user) throw ApiError.notFound('no user found');
            res.json(toUserDto(user));
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new UserController();
