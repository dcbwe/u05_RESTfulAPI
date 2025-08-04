const express         = require('express');
const Validator       = require('../validators/validator');
const settingsController = require('../controllers/settingsController');
const { language, units } = require('../config/configs');

const router = express.Router({ mergeParams: true });

router.get(
    '/',
    Validator.mongoIdParam('userId'),
    Validator.validate,
    settingsController.getSettings
);

router.put(
    '/',
    Validator.mongoIdParam('userId'),
    Validator.configString('language', language, { optional: true }),
    Validator.configString('units', units, { optional: true }),
    Validator.boolean('darkMode', units, { optional: true }),
    Validator.boolean('notifications.email', units, { optional: true }),
    Validator.boolean('notifications.sms', units, { optional: true }),
    Validator.validate,
    settingsController.updateSettings
);

module.exports = router;
