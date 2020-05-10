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

function getAppointmentFromRec(req) {
    return {
        patientID: req.body.patientID,
        doctorID: req.body.doctorID,
        appoint_date: req.body.appoint_date
    };
}

async function post(req, res, next) {
    try {

        let appointment = getAppointmentFromRec(req);
        console.log("Creating appointment:");
        console.log(appointment);
        appointment = await appointments.create(appointment);

        if (appointment !== null) {
            res.contentType('application/json').status(200);
            res.send(JSON.stringify(appointment));
        } else {
            res.status(404).send(JSON.stringify({
                status: 404,
                message: "Error creating appointment"
                // detailed_message: err.message
            }));
        }
        // }
    } catch (err) {
        next(err);
    }
}

module.exports.post = post;

// async function put(req, res, next) {
//     try {
//         let appointment = getAppointmentFromRec(req);
//         // appointment.patientid = req.params.id;
//         console.log("Updating patient");
//         console.log(appointment);
//         appointment = await appointments.update(appointment);
//
//         if (appointment !== null) {
//             res.contentType('application/json').status(200);
//             res.send(JSON.stringify(appointment));
//         } else {
//             res.status(404).send(JSON.stringify({
//                 status: 404,
//                 message: "Error updating appointment information"
//                 // detailed_message: err.message
//             }));
//         }
//     } catch (err) {
//         next(err);
//     }
// }
//
// module.exports.put = put;

async function del(req, res, next) {
    try {
        const context = {};
        if(req.params.doctorid)
            context.doctorid = req.params.doctorid;
        else if(req.params.patientid)
            context.patientid = req.params.patientid;

        console.log(context);
        const success = await appointments.delete(context);

        if (success) {
            res.contentType('application/json').status(200);
            if(req.params.doctorid)
                res.send(JSON.stringify({status:200, message:'Deleted appointments for doctor ' + context.doctorid}));
            else if(req.params.patientid)
                res.send(JSON.stringify({status:200, message:'Deleted appointments for patient ' + context.patientid}));
        } else {
            res.status(404).send(JSON.stringify({
                status: 404,
                message: "Error deleting the appointment"
                // detailed_message: err.message
            }));
        }
    } catch (err) {
        next(err);
    }
}

module.exports.delete = del;