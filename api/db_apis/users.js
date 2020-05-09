 const oracledb = require('oracledb');
const database = require('../services/database.js');

const baseQuery =
 `select userid "userId",
    email "email",
    name "name",
    phone "phone",
    password "pw"
  from users`;

async function find(context) {
  let query = baseQuery;
  const binds = {};

  if (context.id) {
    binds.userid = context.id;

    query += `\nwhere userid = :userid`;
  }

  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

module.exports.find = find;

const loginSql = 
`select userid "id", 
    name "name", 
    email "email", 
    phone "phone", 
    role "userRole"
  from users`;

async function login(email, password) { 
  let binds1 = {};
  let sql = loginSql;

  if(email && password) {
    binds1.email = email;
    binds1.password = password;

    sql += `\nwhere email = :email and password = :password`;
  }
  console.log(sql);
  const result = await database.simpleExecute(loginSql, binds1);
  
  return result.rows;
}
  
module.exports.login = login;

const createSql =
  `insert into users (
    userid,
    name,
    phone,
    email,
    password
  ) values (
    :userid,
    :name,
    :email,
    :password
  )`;


async function create(usr) {
  const user = Object.assign({}, usr);

  // user.userid = {
  //   dir: oracledb.BIND_OUT,
  //   type: oracledb.NUMBER
  // }

  const result = await database.simpleExecute(createSql, user);

  user.userid = result.outBinds.userid[0];

  return user;
}

module.exports.create = create;

const updateSql =
 `update users
  set name = :name,
    phone = :phone,
    email = :email,
    password = :passowrd
  where patientid = :patientid`;

async function update(usr) {
  const user = Object.assign({}, usr);
  const result = await database.simpleExecute(updateSql, user);

  if (result.rowsAffected && result.rowsAffected === 1) {
    return user;
  } else {
    return null;
  }
}

module.exports.update = update;

const deleteSql =
 `begin
    delete from users
    where userid = :userid;
    :rowcount := sql%rowcount;
  end;`

async function del(id) {
  const binds = {
    userid: id,
    rowcount: {
      dir: oracledb.BIND_OUT,
      type: oracledb.NUMBER
    }
  }
  const result = await database.simpleExecute(deleteSql, binds);

  return result.outBinds.rowcount === 1;
}

module.exports.delete = del;