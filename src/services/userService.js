const userModel = require('../models/userModel');

const userService = {};

userService.create = async function(user) {
    return await userModel.create(user);
};

userService.find = async function(query) {
    return await userModel.find(query);
};

userService.findOne = async function(id) {
    return await userModel.findOne(id);
};

userService.update = async function(query, update) {
    return await userModel.update(query, update);
};

userService.deleteOne = async function(id) {
    return await userModel.deleteOne(id);
};

module.exports = userService;
