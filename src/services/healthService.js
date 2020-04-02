const os = require('os');
const healthService = {};

healthService.getHostMachineInfo = function() {
    try {
        return {
            hostname: os.hostname(),
            platform: os.platform(),
            arch: os.arch(),
            cpus: os.cpus().length
        };
    } catch (err) {
        throw err;
    }
};

module.exports = healthService;
