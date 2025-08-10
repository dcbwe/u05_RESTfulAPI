const healthService     = require('../services/healthService');
const profileService    = require('../services/profileService');
const detailsService    = require('../services/detailsService');

/**
 * calculating health metrics for a user
 * @class HealthController
 */
class HealthController {
    /**
    * GET /users/:userId/health
    * fetch profile and details, calculates BMR, activityFactor and calories.
    */
    async getHealth(req, res, next) {
        try {
            const userId = req.params.userId;
            const profile = await profileService.getByUserId(userId);
            const details = await detailsService.getByUserId(userId);

            const input = {
                weight:        details.weight,
                height:        details.height,
                age:           profile.age,
                gender:        profile.gender,
                dailyRoutine:  details.dailyRoutine,
                trainingLevel: details.trainingLevel
            };

            const result = healthService.getHealth(input);

            res.json({ health: result });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new HealthController();
