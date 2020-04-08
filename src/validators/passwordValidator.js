const _ = require('lodash');
const pv = require('password-validator');
const passwordValidator = {};
const text = require('../common/text');
const passPolicy = require('../config/policy.json').password;

passwordValidator.test = function (password, isNewPassword = false) {
    if (password === undefined || password === null || _.isEmpty(password)) {
        return {
            isValid: false,
            message: isNewPassword
                ? text.INVALID_NEW_PASSWORD
                : text.INVALID_PASSWORD
        };
    }

    try {
        let schema = new pv();
        if (passPolicy.minLength.enabled) {
            schema = schema.is().min(passPolicy.minLength.value);
        }
        if (passPolicy.maxLength.enabled) {
            schema = schema.is().max(passPolicy.maxLength.value);
        }
        if (passPolicy.hasUpperCaseLetter.enabled) {
            schema = schema.has().uppercase();
        }
        if (passPolicy.hasLowerCaseLetter.enabled) {
            schema = schema.has().lowercase();
        }
        if (passPolicy.hasDigits.enabled) {
            schema = schema.has().digits();
        }
        if (passPolicy.notSpaces.enabled) {
            schema = schema.not().spaces();
        }

        const result = schema.validate(password);
        if (!result) {
            return {
                isValid: false,
                message: isNewPassword
                    ? text.INVALID_NEW_PASSWORD
                    : text.INVALID_PASSWORD
            };
        }

        return {
            isValid: true
        };
    } catch (err) {
        throw err;
    }
};

module.exports = passwordValidator;
