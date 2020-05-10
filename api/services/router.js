const express = require('express');
const router = new express.Router();
const patients = require('../controllers/patients.js');
const users = require('../controllers/users.js');

router.route('/patients')
    .get(patients.getAll);

// If the route gets an id should that be taken in as the userid in the post method? Or should it just be ignored?
router.route('/patients/:id?')
    .get(patients.get)
    .post(patients.post)
    .put(patients.put)
    .delete(patients.delete);

router.route('/login?')
    .post(users.login);

module.exports = router;