const crypto = require("crypto");

module.exports.getRandomId = function getRandomId(len = 16) {
    return crypto.randomBytes(len).toString("hex");
};


