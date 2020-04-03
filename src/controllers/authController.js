const authService = require('../services/authService');
const response = require('../util/response');
const logger = require('../common/logger')('AuthController');
const moment = require('moment');
const text = require('../common/text');
const authController = {};

authController.local = async function(req, res) {
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
            username: username
        });

        let data = {
            accessToken: token,
            user: {
                username: username
            }
        };
        response.sendSuccess(res, data);
    } catch (err) {
        logger.error(`Do ${req.url} failed, ${err.stack}`);
        response.sendError(res, err);
    }
};

authController.register = async function(req, res) {
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

module.exports = authController;
