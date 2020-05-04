const express = require('express');
const router = new express.Router();
const patients = require('../controllers/patients.js');

router.route('/patients')
    .get(patients.getAll);

router.route('/patients/:id?')
    .get(patients.get)
    .post(patients.post)
    .put(patients.put)
    .delete(patients.delete);

module.exports = router;