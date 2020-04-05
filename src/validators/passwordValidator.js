const _ = require('lodash');
const passwordValidator = {};
const text = require('../common/text');

const MAX_LENGTH = 32;
const MIN_LENGTH = 6;

passwordValidator.test = function (password) {
    if (password === undefined || password === null || _.isEmpty(password)) {
        return {
            isValid: false,
            message: text.INVALID_PASSWORD
        };
    }
    if (password.length < MIN_LENGTH || password.length > MAX_LENGTH) {
        return {
            isValid: false,
            message: text.INVALID_PASSWORD
        };
    }
    return {
        isValid: true
    };
};

module.exports = passwordValidator;
