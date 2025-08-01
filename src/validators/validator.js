const { body, param, query, header, validationResult } = require('express-validator');
const { ApiError } = require('../utils/apiError');
const { gender } = require('../config/configs');

class Validator {
    /**
    * run express-validator and throw ApiError
    */
    static validate(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(ApiError.validationFailed(errors.array()));
        }
        next();
    }

    /**
    * validate email string
    * @param {string} field
    */
    static email(field = 'email') {
        return body(field)
            .exists().withMessage(`${field} is required`).bail()
            .isEmail().withMessage(`${field} must be valid email`).bail()
            .normalizeEmail();
    }

    /**
    * validate birthyear int
    * @param {number} field
    */
    static birthYear(field = 'birthYear', { optional = false } = {}) {
        let chain = body(field);
        if (optional) chain = chain.optional();
        return chain
            .exists(!optional).withMessage(`${field} is required`).bail()
            .isInt({ min: 1900, max: new Date().getFullYear() }).withMessage(`${field} is invalid`).bail();
    }

    /**
    * validate gender string
    * @param {string} field
    */
    static gender(field = 'gender', { optional = false } = {}) {
        let chain = body(field);
        if (optional) chain = chain.optional();
        return chain
            .exists(!optional).withMessage(`${field} is required`).bail()
            .isIn(gender.options).withMessage(`${field} must be either ${gender.options.join(', ')}`).bail();
    }

    /**
    * validate path-param for MongoID
    * @param {string} field
    */
    static mongoIdParam(field = 'userId') {
        return param(field)
            .exists().withMessage(`${field} is required`).bail()
            .isMongoId().withMessage(`${field} must be valid MongoDB ObjectId`);
    }

    /**
    * validate password - min/max-chars, specialchars
    * @param {string} field
    * @param {{ min?: number, max?: number, requireSpecial?: boolean }} opts
    */
    static password(field = 'password', { min = 8, max = 128, requireSpecial = false } = {}) {
        let chain = body(field)
            .exists().withMessage(`${field} is required`).bail()
            .isLength({ min, max })
            .withMessage(`${field} must be ${min} - ${max} chars`).bail();

        if (requireSpecial) {
            chain = chain
            .matches(/(?=.*[!@#$%^&*])/)
            .withMessage(`${field} must contain atleast one special (!@#$%^&*)`);
        }

        return chain;
    }

    /**
    * validate string - body, query, header
    * @param {string} field
    * @param {{ in?: ('body'|'query'|'header'), pattern?: RegExp }} opts
    */
    static string(field, { in: location = 'body', pattern = null } = {}) {
        const source = location === 'query'
            ? query(field)
            : location === 'header'
                ? header(field)
                : body(field);

        let chain = source
            .exists().withMessage(`${field} is required`).bail()
            .isString().withMessage(`${field} must be string`).bail();

        if (pattern) {
            chain = chain
                .matches(pattern)
                .withMessage(`${field} non valid format`);
        }

        return chain;
    }

    /**
    * validate hexdecimal token.
    * @param {string} field default: 'token'
    * @param {{ length?: number }} opts  default: 32
    */
    static token(field = 'token', { length = 32 } = {}) {
        return body(field)
            .exists().withMessage(`${field} is required`).bail()
            .isHexadecimal().withMessage(`${field} must be hex`).bail()
            .isLength({ min: length, max: length })
            .withMessage(`${field} must be exactly ${length} chars`);
    }
}

module.exports = Validator;
