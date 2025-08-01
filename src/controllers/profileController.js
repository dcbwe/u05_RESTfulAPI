const profileService      = require('../services/profileService.js');
const { toProfileDto }    = require('../utils/profileSerializer');
const { ApiError }        = require('../utils/apiError');

class ProfileController {
    /**
    * GET /users/:userId/profile
    */
    async getProfile(req, res, next) {
        try {
            const { userId } = req.params;
            const profile = await profileService.getByUserId(userId);
            if (!profile) throw ApiError.notFound('Profile not found');
            return res.json({ profile: toProfileDto(profile) });
        } catch (err) {
            next(err);
        }
    }

    /**
    * PUT /users/:userId/profile
    */
    async updateProfile(req, res, next) {
        try {
            const { userId } = req.params;
            const data = req.body;
            const updated = await profileService.updateOrCreateProfile(userId, data);
            return res.json({ profile: toProfileDto(updated) });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new ProfileController();
