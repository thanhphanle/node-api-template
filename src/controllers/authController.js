const logger = require('../common/logger')('AuthController');
const response = require('../util/response');
const authService = require('../services/authService');
const moment = require('moment');
const _ = require('lodash');
const text = require('../common/text');
const authController = {};

authController.local = async function (req, res) {
    let username = '';
    let password = '';
    try {
        if (req.body.username !== undefined) {
            username = req.body.username;
        }
        if (req.body.password !== undefined) {
            password = req.body.password;
        }
        let loginResult = await authService.login(username, password);

        if (!loginResult.isAuthenticated) {
            response.sendBadRequest(res, text.INCORRECT_USERNAME_PASSWORD);
            return;
        }

        let token = authService.generateToken({
            user: {
                id: loginResult.user.id,
                username: loginResult.user.username
            }
        });

        let data = {
            accessToken: token,
            user: {
                id: loginResult.user.id,
                username: loginResult.user.username
            }
        };
        response.sendSuccess(res, data);
    } catch (err) {
        logger.error(`Do ${req.url} failed, ${err.stack}`);
        response.sendError(res, err);
    }
};

authController.register = async function (req, res) {
    let username = '';
    let password = '';
    try {
        if (req.body.username !== undefined) {
            username = req.body.username;
        }
        if (req.body.password !== undefined) {
            password = req.body.password;
        }
        let newUser = {
            id: '',
            username: username,
            password: password,
            createdAt: moment().format(),
            updatedAt: moment().format()
        };
        let registerResult = await authService.register(newUser);
        if (registerResult.isSuccess === false) {
            response.sendBadRequest(res, text.USER_EXISTED);
            return;
        }

        let user = registerResult.user;
        delete user.password;
        response.sendSuccess(res, user);
    } catch (err) {
        logger.error(`Do ${req.url} failed, ${err.stack}`);
        response.sendError(res, err);
    }
};

authController.changePassword = async function (req, res) {
    let username = null;
    let password = null;
    let newPassword = null;
    try {
        if (req.body.username !== undefined) {
            username = req.body.username;
        }
        if (req.body.password !== undefined) {
            password = req.body.password;
        }
        if (req.body.newPassword !== undefined) {
            newPassword = req.body.newPassword;
        }
        if (newPassword === null || _.isEmpty(newPassword)) {
            response.sendBadRequest(res, text.INVALID_NEW_PASSWORD);
            return;
        }

        const loginResult = await authService.login(username, password);
        if (loginResult.isAuthenticated === false) {
            response.sendBadRequest(res, text.INCORRECT_USERNAME_PASSWORD);
            return;
        }

        await authService.changePassword(username, newPassword);
        response.sendSuccess(res, {
            statusCode: 200,
            message: text.CHANGE_PASSWORD_SUCCESS
        });
    } catch (err) {
        logger.error(`Do ${req.url} failed, ${err.stack}`);
        response.sendError(res, err);
    }
};

authController.resetPassword = async function (req, res) {
    // To be implemented
};

module.exports = authController;
