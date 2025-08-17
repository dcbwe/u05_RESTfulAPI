const configsService = require('../services/configsService');

class ConfigsController {
    async getAll(req, res, next) {
        try {
            const dto = configsService.getAll();
            res.json({ configs: dto });
        } catch (err) {
            next(err);
        }
    }

    async getOne(req, res, next) {
        try {
            const opts = configsService.getOne(req.params.key);
            res.json({ key: req.params.key, options: opts });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new ConfigsController();
