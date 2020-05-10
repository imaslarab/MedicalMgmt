const doctors = require('../db_apis/doctors.js');
const users = require('../db_apis/users.js');
const util = require('../services/util.js');

async function getAll(req, res, next) {
  try {
    let docs = await doctors.findAll();
    
    if (docs !== null) {
      res.contentType('application/json').status(200);
      res.send(JSON.stringify(docs));
    } else {
      res.set('Content-Type', 'application/json');
      res.status(404).send(JSON.stringify({
          status: 404,
          message: "Error getting the Doctor information"
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

    context.id = req.params.id;
    const rows = await doctors.find(context);

    if (req.params.id) {
      if (rows.length === 1) {
        res.contentType('application/json').status(200);
        res.send(JSON.stringify(rows[0]));
      } else {
        res.status(404).send(JSON.stringify({
          status: 404,
          message: "Error getting the doctor information"
          // detailed_message: err.message
        }));
      }
    } else { // TODO: tutorial sends a 200 OK code?
      res.status(404).send(JSON.stringify({
        status: 404,
        message: "Error getting the doctor information"
        // detailed_message: err.message
      }));
    }
  } catch (err) {
    next(err);
  }
}

module.exports.get = get;

function getDoctorFromRec(req) {
  const doctor = {
    speciality: req.body.speciality,
  };

  return doctor;
}

function getUserFromRec(req) {
  const user = {
    name: req.body.doctorName,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
    role: 'doctor'
  };

  return user;
}

async function post(req, res, next) {
  try {
    let user = getUserFromRec(req);
    user.userid = util.getRandomId(8);
    console.log("Creating user:");
    console.log(user);
    user = await users.create(user);

    if(user !== null) {
      let doctor = getDoctorFromRec(req);
      doctor.doctorid = user.userid;
      console.log("Creating doctor:");
      console.log(doctor);
      doctor = await doctors.create(doctor);

      if (doctor !== null) {
        res.contentType('application/json').status(200);
        res.send(JSON.stringify(doctor));
      } else {
        res.status(404).send(JSON.stringify({
          status: 404,
          message: "Error creating doctor information"
          // detailed_message: err.message
        }));
      }
    }
  } catch (err) {
    next(err);
  }
}

module.exports.post = post;

async function put(req, res, next) {
  try {
    let doctor = getDoctorFromRec(req);
    doctor.doctorid = req.params.id;
    console.log("Updating doctor");
    console.log(doctor);
    doctor = await doctors.update(doctor);

    if (doctor !== null) {
      res.contentType('application/json').status(200);
      res.send(JSON.stringify(doctor));
    } else {
      res.status(404).send(JSON.stringify({
        status: 404,
        message: "Error updating doctor information"
        // detailed_message: err.message
      }));
    }
  } catch (err) {
    next(err);
  }
}

module.exports.put = put;

async function del(req, res, next) {
  try {
    const id = req.params.id;
    console.log("Deleting: " + id);
    const success = await doctors.delete(id);

    if (success) {
      res.contentType('application/json').status(200);
      res.send(JSON.stringify({status:200, message:'Deleted doctor ' + id}));
    } else {
      res.status(404).send(JSON.stringify({
        status: 404,
        message: "Error deleting the doctor"
        // detailed_message: err.message
      }));
    }
  } catch (err) {
    next(err);
  }
}

module.exports.delete = del;