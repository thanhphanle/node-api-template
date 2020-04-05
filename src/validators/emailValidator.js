const _ = require('lodash');
const emailValidator = {};
const text = require('../common/text');

emailValidator.test = function (email) {
    if (email === undefined || email === null || _.isEmpty(email)) {
        return {
            isValid: false,
            message: text.INVALID_EMAIL_FORMAT
        };
    }
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const isValid = emailRegexp.test(email);
    if (!isValid) {
        return {
            isValid: false,
            message: text.INVALID_EMAIL_FORMAT
        };
    } else {
        return {
            isValid: true
        };
    }
};

module.exports = emailValidator;
