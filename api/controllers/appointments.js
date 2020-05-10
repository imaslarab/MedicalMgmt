const appointments = require('../db_apis/appointments.js');

async function getAll(req, res, next) {
    try {
        let pts = await appointments.findAll();
        console.log(pts);
        if (pts !== null) {

            res.contentType('application/json').status(200);
            res.send(JSON.stringify(pts));
        } else {
            res.set('Content-Type', 'application/json');
            res.status(404).send(JSON.stringify({
                status: 404,
                message: "Error getting the appointment information"
                // detailed_message: err.message
            }));
        }
    } catch (err) {
        next(err);
    }
}

module.exports.getAll = getAll;

async function get(req, res, next) {
    try {
        const context = {};

        if(req.params.doctorid)
            context.doctorid = req.params.doctorid;
        else if(req.params.patientid)
            context.patientid = req.params.patientid;

        const rows = await appointments.find(context);

        if (req.params.doctorid || req.params.patientid) {
            if (rows.length !== null) {
                res.contentType('application/json').status(200);
                res.send(JSON.stringify(rows));
            } else {
                res.status(404).send(JSON.stringify({
                    status: 404,
                    message: "Error getting the appointment information"
                    // detailed_message: err.message
                }));
            }
        } else { // TODO: tutorial sends a 200 OK code?
            res.status(404).send(JSON.stringify({
                status: 404,
                message: "Error getting the appointment information"
                // detailed_message: err.message
            }));
        }
    } catch (err) {
        next(err);
    }
}

module.exports.get = get;

// function getPatientFromRec(req) {
//     const patient = {
//         sex: req.body.sex,
//         address: req.body.address,
//         dob: req.body.dob
//     };
//
//     return patient;
// }
//
// function getUserFromRec(req) {
//     const user = {
//         name: req.body.name,
//         phone: req.body.phone,
//         email: req.body.email,
//         password: req.body.password,
//         role: req.body.role
//     };
//
//     return user;
// }
//
// async function post(req, res, next) {
//     try {
//         let user = getUserFromRec(req);
//         user.userid = util.getRandomId(8);
//         console.log("Creating user:");
//         console.log(user);
//         user = await users.create(user);
//
//         if(user !== null) {
//             let patient = getPatientFromRec(req);
//             patient.patientid = user.userid;
//             console.log("Creating patient:");
//             console.log(patient);
//             patient = await patients.create(patient);
//
//             if (patient !== null) {
//                 res.contentType('application/json').status(200);
//                 res.send(JSON.stringify(patient));
//             } else {
//                 res.status(404).send(JSON.stringify({
//                     status: 404,
//                     message: "Error creating patient information"
//                     // detailed_message: err.message
//                 }));
//             }
//         }
//     } catch (err) {
//         next(err);
//     }
// }
//
// module.exports.post = post;
//
// async function put(req, res, next) {
//     try {
//         let patient = getPatientFromRec(req);
//         patient.patientid = req.params.id;
//         console.log("Updating patient");
//         console.log(patient);
//         patient = await patients.update(patient);
//
//         if (patient !== null) {
//             res.contentType('application/json').status(200);
//             res.send(JSON.stringify(patient));
//         } else {
//             res.status(404).send(JSON.stringify({
//                 status: 404,
//                 message: "Error updating patient information"
//                 // detailed_message: err.message
//             }));
//         }
//     } catch (err) {
//         next(err);
//     }
// }
//
// module.exports.put = put;
//
// async function del(req, res, next) {
//     try {
//         const id = req.params.id;
//         console.log("Deleting: " + id);
//         const success = await patients.delete(id);
//
//         if (success) {
//             res.contentType('application/json').status(200);
//             res.send(JSON.stringify({status:200, message:'Deleted patient ' + id}));
//         } else {
//             res.status(404).send(JSON.stringify({
//                 status: 404,
//                 message: "Error deleting the patient"
//                 // detailed_message: err.message
//             }));
//         }
//     } catch (err) {
//         next(err);
//     }
// }
//
// module.exports.delete = del;