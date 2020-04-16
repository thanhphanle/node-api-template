const response = require('../util/response');
const logger = require('../common/logger')('HealthController');
const healthService = require('../services/healthService');
const env = require('../env');

const healthController = {};

healthController.getHealth = async function(req, res) {
    try {
        let data = {
            status: 'Up',
            version: env.VERSION,
            hostMachine: healthService.getHostMachineInfo()
        };
        response.sendSuccess(res, data);
    } catch (err) {
        logger.error(`Access ${req.url} failed, ${err.stack}`);
        response.sendError(res, err);
    }
};

module.exports = healthController;
