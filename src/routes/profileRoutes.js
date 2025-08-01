const express         = require('express');
const Validator       = require('../validators/validator');
const profileController = require('../controllers/profileController');

const router = express.Router({ mergeParams: true });

router.get(
    '/',
    Validator.mongoIdParam('userId'),
    Validator.validate,
    profileController.getProfile
);

router.post(
    '/',
    Validator.mongoIdParam('userId'),
    Validator.string('firstname'),
    Validator.string('lastname'),
    Validator.birthYear('birthYear'),
    Validator.gender('gender'),
    Validator.string('city'),
    Validator.string('country'),
    Validator.validate,
    profileController.updateProfile
);

router.put(
    '/',
    Validator.mongoIdParam('userId'),
    Validator.string('firstname').optional(),  
    Validator.string('lastname').optional(),  
    Validator.birthYear('birthYear', { optional: true }),  
    Validator.gender('gender', { optional: true }),  
    Validator.string('city').optional(),  
    Validator.string('country').optional(),
    Validator.validate,
    profileController.updateProfile
);

module.exports = router;
