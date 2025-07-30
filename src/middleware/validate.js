const { validationResult } = require('express-validator');
const { ApiError } = require('../utils/apiError');


function validate(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = errors.array()[0];
        return next(new ApiError(400, err.msg));
    }
    next();
}

module.exports = validate;
