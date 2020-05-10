const express = require('express');
const router = new express.Router();

const patients = require('../controllers/patients.js');
const doctors = require('../controllers/doctors.js');
const users = require('../controllers/users.js');
const appointments = require('../controllers/appointments.js');

router.route('/patients')
    .get(patients.getAll);

// If the route gets an id should that be taken in as the userid in the post method? Or should it just be ignored?
router.route('/patients/:id?')
    .get(patients.get)
    .post(patients.post)
    .put(patients.put)
    .delete(patients.delete);

router.route('/doctors')
    .get(doctors.getAll);

router.route('/doctors/:id?')
    .get(doctors.get)
    .post(doctors.post)
    .put(doctors.put)
    .delete(doctors.delete);

router.route('/appointments')
    .get(appointments.getAll)
    .post(appointments.post); // TODO: Allows creating appointments with same doctor and on same date as different patient

router.route('/appointments/patients/:patientid?')
    .get(appointments.get);

router.route('/appointments/doctors/:doctorid?')
    .get(appointments.get);

// router.route('/appointments/:id?')
//     .put(appointments.put)
//     .delete(appointments.delete);

router.route('/login?')
    .post(users.login);

module.exports = router;