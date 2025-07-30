const { body, param } = require('express-validator');

module.exports = {
    // POST /users
    registerRules: () => [
        body('email')
        .exists().withMessage('Email is required')
        .bail()
        .isEmail().withMessage('Must be a valid email')
        .normalizeEmail(),
        // TO ADD - password, 
    ],

    // GET /users/:userId
    userIdParam: () => [
        param('userId')
        .isMongoId().withMessage('Invalid userId')
    ]
};
