const users = require('../db_apis/users.js');
const util = require('../services/util.js');

async function get(req, res, next) {
  try {
    const context = {};

    context.id = req.params.id;

    const rows = await users.find(context);
    
    if (req.params.id) {
      if (rows.length === 1) {
        res.contentType('application/json').status(200);
        res.send(JSON.stringify(rows[0]));
      } else {
        res.status(404).send(JSON.stringify({
          status: 404,
          message: "Error getting the user information",
          detailed_message: err.message
        }));
      }
    } else {
      res.status(404).send(JSON.stringify({
        status: 404,
        message: "Error getting the user information",
        detailed_message: err.message
      }));
    }
  } catch (err) {
    next(err);
  }
}

module.exports.get = get;

async function login(req, res, next) {
  try {
    const rows = await users.login(req.body.email, req.body.password);

    if (req.body.email && req.body.password && rows.length === 1) {
        res.contentType('application/json').status(200);
        res.send(JSON.stringify(rows[0]));
    } else {
      res.status(404).send(JSON.stringify({
        status: 404,
        message: "Invalid login",
        detailed_message: 'Error'
      }));
    }
  } catch (err) {
    next(err);
  }
}

module.exports.login = login;

function getUserFromRec(req) {
  const user = {
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role
  };

  return user;
}

async function post(req, res, next) {
  try {
    let user = getUserFromRec(req);
    user.userid = util.getRandomId();
    user = await users.create(user);

    if (user !== null) {
      res.contentType('application/json').status(200);
      res.send(JSON.stringify(user));
    } else {
      res.status(404).send(JSON.stringify({
        status: 404,
        message: "Error updating user information",
        detailed_message: err.message
      }));
    }
  } catch (err) {
    next(err);
  }
}

module.exports.post = post;

async function put(req, res, next) {
  try {
    let user = getUserFromRec(req);

    user.userid = parseInt(req.params.userId, 10);

    user = await users.update(user);

    if (user !== null) {
      res.contentType('application/json').status(200);
      res.send(JSON.stringify(user));
    } else {
      res.status(404).send(JSON.stringify({
        status: 404,
        message: "Error updating user information",
        detailed_message: err.message
      }));
    }
  } catch (err) {
    next(err);
  }
}

module.exports.put = put;

async function del(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);

    const success = await users.delete(id);

    if (success) {
      res.contentType('application/json').status(200);
      res.send(JSON.stringify({status:200, message:'Deleted user'}));
    } else {
      res.status(404).send(JSON.stringify({
        status: 404,
        message: "Error deleting user",
        detailed_message: err.message
      }));
    }
  } catch (err) {
    next(err);
  }
}

module.exports.delete = del;