const _ = require('lodash');
const usernameValidator = {};
const text = require('../common/text');

const MAX_LENGTH = 32;
const MIN_LENGTH = 6;

usernameValidator.test = function (username) {
    if (username === undefined || username === null || _.isEmpty(username)) {
        return {
            isValid: false,
            message: text.INVALID_USERNAME
        };
    }
    if (username.length < MIN_LENGTH || username.length > MAX_LENGTH) {
        return {
            isValid: false,
            message: text.INVALID_USERNAME
        };
    }
    if (_.isNumber(username)) {
        return {
            isValid: false,
            message: text.INVALID_USERNAME
        };
    }
    return {
        isValid: true
    };
};

module.exports = usernameValidator;
