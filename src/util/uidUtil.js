const shortid = require('shortid');
const crypto = require('crypto');
const uidUtil = {};

uidUtil.generate = function(name) {
    const md5 = crypto.createHash('md5');
    let tempId = name + shortid.generate();
    let hash = md5.update(tempId).digest('hex');
    return hash.substring(0, 20);
};

module.exports = uidUtil;
