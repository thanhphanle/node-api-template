const requestConfig = require('../config/request.json');

function setHeader() {
    return async (req, res, next) => {
        if (requestConfig.poweredBy.enabled === true) {
            req.header('X-Powered-By', requestConfig.poweredBy.value);
            res.header('X-Powered-By', requestConfig.poweredBy.value);
        }
        next();
    };
}

module.exports = setHeader;