const express      = require('express');
const router       = express.Router();
const userController = require('../controllers/userController');
const validate = require('../middleware/validate');
const { registerRules, userIdParam } = require('../validators/userValidator');

// signup
router.post(
    '/',
    registerRules(),
    validate,
    userController.register
);
  
// get user
router.get(
    '/:userId',
    userIdParam(),
    validate,
    userController.getById
);

module.exports = router;
