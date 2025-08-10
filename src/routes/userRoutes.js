const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const healthController = require('../controllers/healthController');
const Validator = require('../validators/validator');
const auth = require('../middleware/auth');
const profileRoutes = require('./profileRoutes');
const settingsRoutes = require('./settingsRoutes');
const detailsRoutes = require('./detailsRoutes');

router.post(
    '/signup',
    Validator.email('email'),
    Validator.uniqueEmail('email'),
    Validator.validate,
    userController.register
);
  
router.post(
    '/verify',
    Validator.token('token', { length: 32 }),
    Validator.password('password', { min: 10, requireSpecial: true }),
    Validator.validate,
    userController.verify
);

router.get(
    '/:userId',
    Validator.mongoIdParam('userId'),
    Validator.validate,
    userController.getById
);

router.post(
    '/login',
    Validator.email('email'),
    Validator.password('password'),
    Validator.validate,
    userController.login
);

router.delete(
    '/:userId',
    auth,
    Validator.mongoIdParam('userId'),
    Validator.validate,
    userController.deleteAccount
);

router.get(
    '/:userId/health',
    Validator.mongoIdParam('userId'),
    Validator.validate,
    healthController.getHealth
);

router.use('/:userId/profile', auth, profileRoutes);
router.use('/:userId/details', auth, detailsRoutes);
router.use('/:userId/settings', auth, settingsRoutes);

module.exports = router;
