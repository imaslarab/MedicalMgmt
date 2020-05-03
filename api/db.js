'user strict';

var oracledb = require('oracledb ');

var connAttrs = {
    "user": "agalphonsus",
    "password": "AGALPHONSUS",
    "connectString": "(DESCRIPTION = (ADDRESS_LIST =" +
        "(ADDRESS = (PROTOCOL = TCP)(Host = oracle.WPI.EDU)(Port = 1521)))(CONNECT_DATA =(SID = ORCL)))"
};

//local db connection
var connection = null;

oracledb.getConnection({
    connAttrs, function(err, dbconection) {
        if (err) throw err;

        connection = dbconnection;
    }
});

module.exports = connection;
