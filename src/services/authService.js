const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require('../env');
const userService = require('./userService');
const uidUtil = require('../util/uidUtil');
const authService = {};
const saltRounds = 10;

authService.login = async function(username, password) {
    try {
        const foundUsers = await userService.find({ username: username });
        if (foundUsers.length === 0) {
            return {
                isAuthenticated: false
            };
        }

        let hash = foundUsers[0].password;
        let comparePassword = function() {
            return new Promise((resolve, reject) => {
                bcrypt.compare(password, hash, (err, result) => {
                    if (err) {
                        console.error(`Compare hash failed, ${err}`);
                        reject(new Error(err.toString()));
                    }
                    resolve(result);
                });
            });
        };
        let isMatched = await comparePassword();
        return {
            isAuthenticated: isMatched
        };
    } catch (err) {
        throw err;
    }
};

authService.register = async function(user) {
    try {
        const users = await userService.find({ username: user.username });
        if (users.length > 0) {
            return {
                isSuccess: false,
                isExisted: true
            };
        }

        // Hash plain text password
        let salt = await bcrypt.genSalt(saltRounds);
        let hash = await bcrypt.hash(user.password, salt);
        user.password = hash;

        // Generate user id
        let id = uidUtil.generate(user.username);
        user.id = id;

        const newUser = await userService.create(user);
        return {
            isSuccess: true,
            user: newUser
        };
    } catch (err) {
        throw err;
    }
};

authService.generateToken = function(data) {
    const signature = env.JWT_KEY;
    const expiration = '1h';
    return jwt.sign({ data }, signature, { expiresIn: expiration });
};

authService.verifyToken = function(token) {
    try {
        const signature = env.JWT_KEY;
        let decoded = jwt.verify(token, signature);
        return decoded;
    } catch (err) {
        throw err;
    }
};

authService.decodeToken = function(token) {
    try {
        let decoded = jwt.decode(token);
        return decoded;
    } catch (err) {
        throw err;
    }
};

module.exports = authService;
