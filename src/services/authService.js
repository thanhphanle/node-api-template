const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require('../env');
const userService = require('./userService');
var authService = {};
const saltRounds = 10;

authService.login = async function(username, password) {
    try {
        const foundUser = await userService.find({ username: username });
        if (foundUser === null) {
            return {
                isAuthenticated: false
            };
        }

        let hash = foundUser.password;
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
        const existedUser = await userService.find({ username: username });
        if (existedUser !== null) {
            return {
                isSuccess: false,
                isExisted: true
            };
        }

        let salt = await bcrypt.genSalt(saltRounds);
        let hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
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
