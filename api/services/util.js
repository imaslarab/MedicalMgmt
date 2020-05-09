const crypto = require("crypto");

module.exports.getRandomId = function getRandomId(len = 16) {
    return crypto.randomBytes(len).toString("hex");
};

module.exports.formatOutputData = function formatOutput(data) {
    let dataRes = JSON.parse(JSON.stringify(data).replace(/"\s+|\s+"/g,'"'));

    return dataRes;
}


