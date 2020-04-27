const express = require('express');
const router = express.Router();

const oracledb = require('oracledb');
const connAttrs = {
    "user": "agalphonsus",
    "password": "AGALPHONSUS",
    "connectString": "(DESCRIPTION = (ADDRESS_LIST =" +
        "(ADDRESS = (PROTOCOL = TCP)(Host = oracle.WPI.EDU)(Port = 1521)))(CONNECT_DATA =(SID = ORCL)))"
};

router.get('/', function(req, res) {
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

        connection.execute("SELECT * FROM PATIENT", {}, {
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error getting the patient information",
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

// Create patient
router.post('/submit', function(req, res, next) {
    // res.render('index', { title: 'Express' });

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

        // Logic needed:
        //   - Insert into user table (user_id, name, email, password, phone)
        //       - Generate user_id const { v4: uuidv4 } = require('uuid');
        //             uuidv4();
        //       - Are all the fields necessary? How do they get passed in?
        //   - Now, insert into patient table

        const createUserSQL = `INSERT INTO Users (userID, name, email, password, phone) 
            VALUES (:userID, :name, :email, :password, :phone )`;
            // INSERT INTO Patient(patientID, address)
            // VALUES (:patientID, :address)`;
        const { v4: uuidv4 } = require('uuid');
        const id = uuidv4();
        const user = {
            userID: id,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone
        };

        const createPatientSQL = `INSERT INTO Patient(patientID, address) 
            VALUES (:patientID, :address)`;
        const patient = {
            patientID: id,
            address: req.body.address,
        };
        // const createUserSQL = "INSERT INTO Users (" +
        //     "name, " +
        //     "email, " +
        //     "password, " +
        //     "phone" +
        //     ") VALUES (?, ?, ?, ?)";

        // user.userID = {
        //     dir: oracledb.BIND_OUT,
        //     type: oracledb.STRING
        // };



        // let stmt = "INSERT INTO patient(patient_id, address) VALUES(?, ?)";
        // let patient = ['5120000006', '175 Freedom St, Brookline, MA']; // For testing post method
        // console.log(req);

        // console.log(req.query.address);

        // const patient = {
        //     patient_id: '5120000013',
        //     address: req.query.address
        // };

        // var patientInfo = req.body;
        // if(!patientInfo.name ||
        //     !patientInfo.email ||
        //     !patientInfo.password ||
        //     !patientInfo.phone) {
        //     res.render('show_message', {
        //         message: "All attributes of patient info not received", type: "error"
        //     });
        // } else {
        //     const newPatient = new Patient({
        //         name: patientInfo.name,
        //         email: patientInfo.email,
        //         password: patientInfo.password,
        //         phone: patientInfo.phone
        //     });
        //
        //     newPatient.save(function(err, Person){
        //         if(err)
        //             res.render('show_message', {message: "Database error", type: "error"});
        //         else
        //             res.render('show_message', {
        //                 message: "New person added", type: "success", person: personInfo});
        //     });
        // }

        connection.execute(createUserSQL, user, function(err, result) {
            if (err) {
                console.log(user);
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error inserting patient information",
                    detailed_message: err.message
                }));
            } else {
                console.log(user);
                console.log(JSON.stringify(result));
                console.log(JSON.stringify(err));
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

        // connection.execute(createPatientSQL, patient, function (err, result) {
        //     if (err) {
        //         console.log(err);
        //         console.log(patient);
        //         res.set('Content-Type', 'application/json');
        //         res.status(500).send(JSON.stringify({
        //             status: 500,
        //             message: "Error inserting patient information",
        //             detailed_message: err.message // TODO: If parent key not found, insert into Users
        //         }));
        //
        //     } else {
        //         // get inserted id???
        //         console.log('Result:' + result);
        //     }
        //     // Release the connection
        //     connection.release(
        //         function (err) {
        //             if (err) {
        //                 console.error(err.message);
        //             } else {
        //                 console.log("GET /user_profiles : Connection released");
        //             }
        //         });
        // });

        // redirect to some page
        // res.redirect('/users');
    });
});

// // edit patient
// router.post('/:patientId', function(req, res, next) {
//     res.render('index', { title: 'Express' });
// });

module.exports = router;
