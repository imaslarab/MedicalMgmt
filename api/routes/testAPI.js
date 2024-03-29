var express = require('express');
var router = express.Router();

var oracledb = require('oracledb');
var connAttrs = {
    "user": "sbaral",
    "password": "SBARAL",
    "connectString": "(DESCRIPTION = (ADDRESS_LIST =" +
        "(ADDRESS = (PROTOCOL = TCP)(Host = oracle.WPI.EDU)(Port = 1521)))(CONNECT_DATA =(SID = ORCL)))"
}

router.get('/', function(req, res, next) {
    oracledb.getConnection(connAttrs, function (err, connection) {
        if (err) {
            // Error connecting to DB
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error connecting to DB",
                detailed_message: err.message
            }));
            return;
        }

        connection.execute("SELECT * FROM DEPARTMENT", {}, {
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error getting the department",
                    detailed_message: err.message
                }));
            } else {
                res.contentType('application/json').status(200);
                res.send(JSON.stringify(result.rows));
            }
            // Release the connection
            connection.release(
                function (err) {
                    if (err) {
                        console.error(err.message);
                    } else {
                        console.log("GET /user_profiles : Connection released");
                    }
                });
        });
    });
    
});

module.exports = router;