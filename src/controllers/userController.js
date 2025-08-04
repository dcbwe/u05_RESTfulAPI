const userService  = require('../services/userService');
const { toUserDto } = require('../utils/userSerializer');

class UserController {
    /**
    * POST /users/signup
    * registers a new user by email and returns the verification token
    * @param {import('express').Request} req  express request with body { email }
    * @param {import('express').Response} res  express response
    * @param {import('express').NextFunction} next express next middleware
    */
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

    /**
    * POST /users/verify
    * verifies a user's account using the provided token and sets a password
    * @param {import('express').Request} req  express request with body { token, password }
    * @param {import('express').Response} res  express response
    * @param {import('express').NextFunction} next express next middleware
    */
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

    /**
    * POST /users/login
    * authenticates user with email and password and returns a JWT
    * @param {import('express').Request} req  express request with body { email, password }
    * @param {import('express').Response} res  express response
    * @param {import('express').NextFunction} next express next middleware
    */
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

    /**
    * GET /users/:userId
    * retrieves user's public information by userId
    * @param {import('express').Request} req  express request with params { userId }
    * @param {import('express').Response} res  express response
    * @param {import('express').NextFunction} next express next middleware
    */
    async getById(req, res, next) {
        try {
            const user = await userService.getById(req.params.userId);
            res.json(toUserDto(user));
        } catch (err) {
            next(err);
        }
    }
    /**
    * DELETE /users/:userId
    */
    async deleteAccount(req, res, next) {
        try {
            await userService.deleteAccount(req.params.userId);
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new UserController();
