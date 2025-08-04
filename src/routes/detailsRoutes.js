const express         = require('express');
const Validator       = require('../validators/validator');
const detailsController = require('../controllers/detailsController');
const { dailyRoutine, trainingLevel } = require('../config/configs');


const router = express.Router({ mergeParams: true });

router.get(
    '/',
    Validator.mongoIdParam('userId'),
    Validator.validate,
    detailsController.getDetails
);

router.post(
    '/',
    Validator.mongoIdParam('userId'),
    Validator.number('height', { integer: true,  min: 0 }),
    Validator.number('weight', { integer: true,  min: 0 }),
    Validator.configString('dailyRoutine', dailyRoutine),
    Validator.configString('trainingLevel', trainingLevel),
    Validator.validate,
    detailsController.updateDetails
);

router.put(
    '/',
    Validator.mongoIdParam('userId'),
    Validator.number('height', { integer: true,  min: 0, optional: true }),
    Validator.number('weight', { integer: true,  min: 0, optional: true }),
    Validator.configString('dailyRoutine', dailyRoutine, { optional: true }),
    Validator.configString('trainingLevel', trainingLevel, { optional: true }),
    Validator.validate,
    detailsController.updateDetails
);

module.exports = router;
