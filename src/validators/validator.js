const { body, param, query, header, validationResult } = require('express-validator');
const { ApiError } = require('../utils/apiError');
const EmailHasher = require('../utils/emailHasher');
const userRepository = require('../repositories/userRepository');

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

    static uniqueEmail(field = 'email') {
        return body(field)
            .custom(async (value) => {
                const normalized = value.toLowerCase().trim();
                const emailHash  = EmailHasher.hash(normalized);
        
                const existing = await userRepository.model.findOne({
                    $or: [
                        { email: normalized },
                        { emailHash }
                    ]
                });
    
                if (existing) {
                    throw new Error('Email already in use');
                }
                return true;
            });
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
    * validate string from config-preset (enum).
    * @param {string} field  name of field in request-body.
    * @param {{ options: string[] }} preset   config-object + .options
    * @param {{ optional?: boolean }} opts
    */
    static configString(field, preset, { optional = false } = {}) {
        let chain = body(field);
        if (optional) {
            chain = chain.optional();
        } else {
            chain = chain.exists().withMessage(`${field} is required`).bail();
        }
        return chain
            .isIn(preset.options)
            .withMessage(`${field} must be either: ${preset.options.join(', ')}`)
            .bail();
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

    /**
    * Validate a numeric field (integer or float), in body/query/header.
    * @param {string} field            Name of the field to validate.
    * @param {{
    *   in?: 'body'|'query'|'header',
    *   integer?: boolean,
    *   min?: number,
    *   max?: number,
    *   optional?: boolean
    * }} opts
    */
    static number(field, {
        in: location = 'body',
        integer    = false,
        min        = null,
        max        = null,
        optional   = false
    } = {}) {
        const source = location === 'query'
            ? query(field)
            : location === 'header'
                ? header(field)
                : body(field);

        let chain = source;
        if (optional) {
            chain = chain.optional();
        } else {
            chain = chain.exists().withMessage(`${field} is required`).bail();
        }

        if (integer) {
            chain = chain.isInt().withMessage(`${field} must be an integer`).bail();
        } else {
            chain = chain.isFloat().withMessage(`${field} must be a number`).bail();
        }

        if (min !== null) {
            chain = chain
            .custom(value => parseFloat(value) >= min)
            .withMessage(`${field} must be ≥ ${min}`)
            .bail();
        }
        if (max !== null) {
            chain = chain
            .custom(value => parseFloat(value) <= max)
            .withMessage(`${field} must be ≤ ${max}`)
            .bail();
        }

        return chain;
    }

    /**
    * Validate a boolean field, in body/query/header.
    * @param {string} field         Name of the field to validate.
    * @param {{
    *   in?: 'body'|'query'|'header',
    *   optional?: boolean
    * }} opts
    */
    static boolean(field, { in: location = 'body', optional = false } = {}) {
        const source = location === 'query'
            ? query(field)
            : location === 'header'
                ? header(field)
                : body(field);
   
        let chain = source;
        if (optional) {
            chain = chain.optional();
        } else {
            chain = chain.exists().withMessage(`${field} is required`).bail();
        }
   
        return chain
            .isBoolean().withMessage(`${field} must be a boolean`).bail()
            .toBoolean();
    }
}

module.exports = Validator;
