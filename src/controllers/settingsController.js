const settingsService = require('../services/settingsService');
const { toSettingsDto } = require('../utils/settingsSerializer');

class SettingsController {
    /**
    * GET /users/:userId/settings
    * fetches the settings for the given userId
    * @param {import('express').Request} req  Express request object
    * @param {import('express').Response} res  Express response object
    * @param {import('express').NextFunction} next Express next middleware
    */
    async getSettings(req, res, next) {
        try {
            const settings = await settingsService.getByUserId(req.params.userId);
            res.json({ settings: toSettingsDto(settings) });
        } catch (err) {
            next(err);
        }
    }

    /**
    * POST|PUT /users/:userId/settings
    * creates or updates settings for the given userId based on request body data
    * @param {import('express').Request} req  express request containing userId and settings data
    * @param {import('express').Response} res  express response object
    * @param {import('express').NextFunction} next express next middleware
    */
    async updateSettings(req, res, next) {
        try {
            const settings = await settingsService.updateOrCreateSettings(req.params.userId, req.body);
            res.json({ settings: toSettingsDto(settings) });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new SettingsController();
