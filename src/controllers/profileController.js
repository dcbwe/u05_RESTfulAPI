const profileService = require('../services/profileService');
const { toProfileDto } = require('../utils/profileSerializer');

class ProfileController {
    /**
    * GET /users/:userId/profile
    * fetches the profile for the given userId
    * @param {import('express').Request} req  Express request object
    * @param {import('express').Response} res  Express response object
    * @param {import('express').NextFunction} next Express next middleware
    */
    async getProfile(req, res, next) {
        try {
            const profile = await profileService.getByUserId(req.params.userId);
            res.json({ profile: toProfileDto(profile) });
        } catch (err) {
            next(err);
        }
    }

    /**
    * POST|PUT /users/:userId/profile
    * creates or updates profile for the given userId based on request body data
    * @param {import('express').Request} req  express request containing userId and profile data
    * @param {import('express').Response} res  express response object
    * @param {import('express').NextFunction} next express next middleware
    */
    async updateProfile(req, res, next) {
        try {
            const profile = await profileService.updateOrCreateProfile(req.params.userId, req.body);
            res.json({ profile: toProfileDto(profile) });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new ProfileController();
