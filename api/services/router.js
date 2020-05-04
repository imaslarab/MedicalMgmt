const express = require('express');
const router = new express.Router();
const employees = require('../controllers/employees.js');
const patients = require('../controllers/patients.js');

router.route('/employees/:id?')
    .get(employees.get)
    .post(employees.post)
    .put(employees.put)
    .delete(employees.delete);


router.route('/patients')
    .get(patients.getAll);

router.route('/patients/:id?')
    .get(patients.get)
    .post(patients.post)
    .put(patients.put)
    .delete(patients.delete);

module.exports = router;