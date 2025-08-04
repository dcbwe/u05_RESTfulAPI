const detailsService = require('../services/detailsService');
const { toDetailsDto } = require('../utils/detailsSerializer');

class DetailsController {
    /**
    * GET /users/:userId/details
    * fetches the details for the given userId
    * @param {import('express').Request} req  Express request object
    * @param {import('express').Response} res  Express response object
    * @param {import('express').NextFunction} next Express next middleware
    */
    async getDetails(req, res, next) {
        try {
            const details = await detailsService.getByUserId(req.params.userId);
            res.json({ details: toDetailsDto(details) });
        } catch (err) {
            next(err);
        }
    }

    /**
    * POST|PUT /users/:userId/details
    * creates or updates details for the given userId based on request body data
    * @param {import('express').Request} req  express request containing userId and details data
    * @param {import('express').Response} res  express response object
    * @param {import('express').NextFunction} next express next middleware
    */
    async updateDetails(req, res, next) {
        try {
            const details = await detailsService.updateOrCreateDetails(req.params.userId, req.body);
            res.json({ details: toDetailsDto(details) });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new DetailsController();
