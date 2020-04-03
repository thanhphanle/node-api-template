const logger = require('../common/logger')('UserController');
const response = require('../util/response');
const userService = require('../services/userService');

const userController = {};

userController.listUser = async function(req, res) {
    try {
        let users = await userService.find({});
        users.forEach(element => {
            delete element.password;
        });
        response.sendSuccess(res, users);
    } catch (err) {
        logger.error(`Do ${req.url} failed, ${err.stack}`);
        response.sendError(res, err);
    }
};

module.exports = userController;