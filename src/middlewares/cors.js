const serverConfig = require('../config/server.json');

function cors() {
    return (req, res, next) => {
        if (serverConfig.cors.enabled) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header(
                'Access-Control-Allow-Headers',
                'Origin, X-Requested-With, Content-Type, Accept'
            );
        }
        next();
    };
}

module.exports = cors;
