const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const Validator = require('../validators/validator');
const auth = require('../middleware/auth');
const profileRoutes = require('./profileRoutes');

router.post(
    '/signup',
    Validator.email('email'),
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

router.use('/:userId/profile', auth, profileRoutes);

module.exports = router;
